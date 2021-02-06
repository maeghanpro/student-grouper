import { User } from '../../models/index.js'

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: 'testTwo@test.com',
        cryptedPassword: '$2b$10$AeVA3F2mDP99/pnkwM5L3OCJf16bwqDoNxNUoTIty8b1hFtD2tRSS'
      },
      {
        email: 'test@test.com',
        cryptedPassword: '$2b$10$EDfv.xh4e8YXOgvJcNloue.0oxR.z4zzPAptuPEDAg9N7MFEPvnfm'
      }
    ]

    for (const user of userData) {
      const currentUser = await User.query().findOne(user)

      if(!currentUser) {
        await User.query().insert(user)
      }
    }
  }
}

export default UserSeeder