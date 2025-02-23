import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import hash from '@adonisjs/core/services/hash'

export default class ProfileController {

  public async show({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized('Please log in to view your profile.')
    }
    return response.ok({ user })
  }

  public async update({ request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized('Please log in to update your profile.')
    }

    const data = request.only(['username', 'email', 'bio'])

    const image = request.file('profileImage', {
      extnames: ['jpg', 'png', 'jpeg'],
      size: '2mb',
    });

    const fileName = `${new Date().getTime()}.${image?.extname}`;
    await image?.move(app.makePath('public/uploads'), {
      name: fileName,
      overwrite: true,
    });

    const imageProfile = `/uploads/${fileName}`;
    user.merge({ ...data, profile_image: imageProfile })

    await user.save()

    return response.ok('Profile updated successfully.')
  }

  public async changePassword({ request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized('Please log in to change your password.')
    }

    const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])

    const isCurrentPasswordValid = await hash.verify(user.password, currentPassword)
    if (!isCurrentPasswordValid) {
      return response.badRequest('Current password is incorrect.')
    }

    user.password = newPassword
    await user.save()

    return response.ok('Password changed successfully.')
  }
}
