import userModel from '../dao/models/users.model.js';

class UserService {
    constructor() {
      this.model = userModel;
    }
  
    async getALL() {
      return await this.model.find();
    }
  
    async getByEmail(email) {
      return await this.model.findOne({ email: email });
    }
  
    async createUser(userData) {
      return await this.model.create(userData);
    }

    async upgradeUserToPremium(userId) {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          userId,
          { $set: { role: 'premium' } },
          { new: true }
        );
  
        return updatedUser;
      } catch (error) {
        throw new Error('Error al actualizar el usuario a premium');
      }
    }
  
  }
  
  const userService = new UserService();
  
  export default userService;
