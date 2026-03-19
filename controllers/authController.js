import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5)
    const user = new User({ ...req.body, password: hash })
    await user.save()
    res.status(201).json('User created.')
  } catch (err) {
    if (err.code === 11000) return res.status(400).json('Username or email already exists.')
    res.status(500).json('Something went wrong.')
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).json('User not found.')

    const match = bcrypt.compareSync(req.body.password, user.password)
    if (!match) return res.status(400).json('Wrong password.')

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password, ...info } = user._doc
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .status(200)
      .json(info)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const logout = (req, res) => {
  res
    .clearCookie('accessToken', { sameSite: 'lax' })
    .status(200)
    .json('Logged out.')
}