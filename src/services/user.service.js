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
        const user = await this.model.findById(userId);
  
        if (!user) {
          return null; // Usuario no encontrado
        }
  
        if (user.role === 'user') {
          user.role = 'premium';
        } else if (user.role === 'premium') {
          user.role = 'user';
        }
  
        const updatedUser = await user.save();
        return updatedUser;
      } catch (error) {
        throw new Error('Error al actualizar el usuario a premium');
      }
    }
  
  
  }
  
  const userService = new UserService();
  
  export default userService;
