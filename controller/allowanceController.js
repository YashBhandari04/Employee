
import AllowanceRequest from '../model/allowanceRequestmodel.js';
import User from '../model/usermodel.js';
import { sendNewRequestEmail } from '../service/email.js';

export const createRequest = async (req, res, next) => {
  try {
    const { userId, amount, description, date } = req.body;
    if (!userId || amount === undefined) {
      return res.status(400).json({ message: 'userId and amount are required' });
    }

    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json({ message: 'User not found' });

    const requestDoc = await AllowanceRequest.create({
      user: userId,    
      amount,
      description,
      date
    });

    try {
      await sendNewRequestEmail({
        employeeName: foundUser.name,
        employeeEmail: foundUser.email,
        department: foundUser.department,
        amount,
        description,
        date: requestDoc.date
      });
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }

    const populated = await requestDoc.populate('user', 'name email department');
    return res.status(201).json(populated);
  } catch (err) {
    return next(err);
  }
};

export const getRequests = async (_req, res, next) => {
  try {
    const list = await AllowanceRequest.find()
      .populate('user', 'name email department')
      .sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    return next(err);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await AllowanceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email department');

    if (!updated) return res.status(404).json({ message: 'Request not found' });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

export const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await AllowanceRequest.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
};
