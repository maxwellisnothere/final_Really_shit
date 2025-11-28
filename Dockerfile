# ---------------------------------------------------
# Stage 1: ครัวร้อน (ใช้ Node.js Build งาน)
# ---------------------------------------------------
# 👇 แก้ตรงนี้ครับ เปลี่ยนเป็น version 20
FROM node:20-alpine as builder 

# กำหนดโฟลเดอร์ทำงาน
WORKDIR /app

# ก๊อปใบสั่งซื้อของ (package.json) มาก่อน
COPY package*.json ./

# ติดตั้งของ (Install Dependencies)
RUN npm install

# ก๊อปโค้ดทั้งหมดลงไป
COPY . .

# 💥 ระเบิดพลัง Build!
RUN npm run build

# ---------------------------------------------------
# Stage 2: หน้าร้าน (ใช้ Nginx เสิร์ฟของ)
# ---------------------------------------------------
FROM nginx:alpine

# ลบ Config เดิมของ Nginx ทิ้งไป
RUN rm /etc/nginx/conf.d/default.conf

# เอา Config ของเราใส่เข้าไปแทน
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ก๊อปไฟล์ที่ Build เสร็จจาก Stage 1 มาวางที่หน้าร้าน
COPY --from=builder /app/dist /usr/share/nginx/html

# เปิดประตูพอร์ต 80
EXPOSE 80

# สั่งรัน Nginx
CMD ["nginx", "-g", "daemon off;"]