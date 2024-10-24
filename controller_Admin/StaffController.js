const {Staff} = require('../models/Staff');

const StaffController = {
  // Lấy danh sách nhân viên
  async getStaffs(req, res) {
    try {
      const staffs = await Staff.find().populate('user');
      res.status(200).json({ status: 1, staffs });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  // Thêm nhân viên
  async addStaff(req, res) {
    try {
      const { user, level, salary, guarantee } = req.body;
      const newStaff = new Staff({ user, level, salary, guarantee });
      await newStaff.save();
      res.status(200).json({ status: 1, message: 'Staff added successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  // Sửa thông tin nhân viên
  async updateStaff(req, res) {
    try {
      const { id } = req.params;
      const { user, level, salary, guarantee } = req.body;
      const updatedStaff = await Staff.findByIdAndUpdate(id, { user, level, salary, guarantee });
      if (!updatedStaff) {
        return res.status(404).json({ status: -1, message: 'Staff not found' });
      }
      res.status(200).json({ status: 1, message: 'Staff updated successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  // Xóa nhân viên
  async deleteStaff(req, res) {
    try {
      const { id } = req.params;
      const deletedStaff = await Staff.findByIdAndDelete(id);
      if (!deletedStaff) {
        return res.status(404).json({ status: -1, message: 'Staff not found' });
      }
      res.status(200).json({ status: 1, message: 'Staff deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },

  // tổng lương nhân viên
  async totalSalary(req, res) {
    try {
      const staffs = await Staff.find();
      let total = 0;
      staffs.forEach(staff => {
        total += staff.salary;
      });
      res.status(200).json({ status: 1, total });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  // kiểm tra thời gian làm việc
  async checkWorkTimePerMonth(req, res) {
    try {
      const { id } = req.params;

      // Tìm nhân viên bằng ID
      const staff = await Staff.findById(id);
      if (!staff) {
        return res.status(404).json({ status: -1, message: 'Staff not found' });
      }

      const { month, year } = req.body; // Lấy tháng và năm từ query nếu có

      // Tính ngày đầu và ngày cuối của tháng
      const currentMonth = month ? parseInt(month, 10) - 1 : new Date().getMonth(); // Chuyển đổi từ 1-12 sang 0-11
      const currentYear = year ? parseInt(year, 10) : new Date().getFullYear();

      const firstDayInTimezone = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
      const lastDayInTimezone = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59));

      // Lọc thời gian làm việc trong tháng
      const workTime = staff.workTime;
      const workTimeInMonth = workTime.filter(
        (time) => new Date(time.date).getTime() >= firstDayInTimezone.getTime() &&
          new Date(time.date).getTime() <= lastDayInTimezone.getTime()
      );

      res.status(200).json({ status: 1, workTimeInMonth });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  // danh sách request nghỉ phép
  async getRequestOff(req, res) {
    try {
      const staff = await Staff.find().populate('user', 'name', 'avatar');
      const requestOffList = staff
        .map(s => {
          const pendingRequest = s.requestOff.filter(r => r.status === 'pending');
          if (pendingRequest.length === 0) return null;

          return {
            staffId: s._id,                 
            staffName: s.user.name,          
            staffAvatar: s.user.avatar,    
            requestOff: pendingRequest.map(r => ({ // Trả về các yêu cầu nghỉ phép pending
              requestId: r._id,              
              date: r.date,                
              reason: r.reason,              
              status: r.status,              
              approvedBy: r.approvedBy      
            }))
          };
        }).filter(Boolean);

        if(requestOffList.length === 0) {
          return res.status(404).json({ status: -1, message: 'No request off found' });
        }
      res.status(200).json({ status: 1, requestOff: requestOffList });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  // xác nhận nghỉ phép
  async confirmRequestOff(req, res) {
    try {
      const { managerId } = req.body;
      const { id } = req.params;
      const { requestId } = req.body;

      // Tìm nhân viên bằng ID
      const staff = await Staff.findById(id);
      if (!staff) {
        return res.status(404).json({ status: -1, message: 'Staff not found' });
      }

      // Tìm request off trong danh sách request off của nhân viên
      const requestOff = staff.requestOff._id(requestId);
      if (!requestOff) {
        return res.status(404).json({ status: -1, message: 'Request off not found' });
      }

      // Xác nhận request off
      requestOff.status = 'approved';
      requestOff.approvedBy = managerId;
      // Tạo mới một bản ghi trong workTime cho ngày nghỉ phép
      const workTimeOff = {
        date: requestOff.date,
        isOff: true,
        reason: requestOff.reason
      };

      // Thêm bản ghi vào workTime của nhân viên
      staff.workTime.push(workTimeOff);
      await staff.save();

      res.status(200).json({ status: 1, message: 'Request off confirmed successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  async rejectRequestOff(req, res) {
    try {

      const { managerId } = req.body;
      const { id } = req.params;
      const { requestId } = req.body;


      const staff = await Staff.findById(id);
      if (!staff) {
        return res.status(404).json({ status: -1, message: 'Staff not found' });
      }

      const requestOff = staff.requestOff.id(requestId);
      if (!requestOff) {
        return res.status(404).json({ status: -1, message: 'Request off not found' });
      }

      requestOff.status = 'rejected';
      requestOff.approvedBy = managerId;

      await staff.save();

      res.status(200).json({ status: 1, message: 'Request off rejected successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },


}

module.exports = StaffController;