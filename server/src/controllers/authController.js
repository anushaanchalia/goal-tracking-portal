const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCount = await prisma.user.count();
    const employeeCode = `EMP-${userCount + 1000}`;
    const accountStatus = userCount === 0 ? "APPROVED" : "PENDING";

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        employeeCode,
        accountStatus
      }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
  
      if (user.accountStatus !== "APPROVED") {
        return res.status(403).json({
          message: "Your account is pending approval."
        });
      }
  
      const valid = await bcrypt.compare(password, user.password);
  
      if (!valid) {
        return res.status(400).json({
          message: "Invalid password"
        });
      }
  
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          employeeCode: user.employeeCode
        },
        process.env.JWT_SECRET
      );
  
      res.json({
        token,
        user
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.login = login;

exports.socialLogin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: "You must register with this email first."
      });
    }

    if (user.accountStatus !== "APPROVED") {
      return res.status(403).json({
        message: "Your account is pending approval."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        employeeCode: user.employeeCode
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};