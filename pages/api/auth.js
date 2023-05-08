import { mongooseConnect } from "@/config/mongoose";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { username, password } = req.body;
    try {
      const userLogin = await User.findOne({ username: username });
      if (!userLogin) {
        return res
          .status(200)
          .json({ status: false, message: "Tên đăng nhập không tồn tại" });
      }

      if (password !== userLogin.password) {
        return res
          .status(200)
          .json({ status: false, message: "Mật khẩu không đúng" });
      } else {
        const payload = {
          user: {
            id: userLogin._id,
            username: userLogin.username,
          },
        };

        jwt.sign(payload, "LeQuocHuy", { expiresIn: "24h" }, (err, token) => {
          if (err) {
            return res
              .status(200)
              .json({ status: false, message: "Lỗi Nghiêm Trọng" });
          }
          res.status(200).json({
            status: true,
            message: "Đăng nhập thành công",
            accessToken: token,
          });
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: "Lỗi trong quá trình đăng nhập" });
    }
  }
}
