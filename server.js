const express = require('express');
const { analyzeProfitability } = require('./profit_engine'); 
const { GoogleGenAI } = require('@google/genai');
const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: 'AIzaSyBxJQIuYat7DgRIT-cOLJ02yw_CTtK_BTQ' });

// الـ Webhook اللي شوبيفاي هتبعتله البيانات
app.post('/webhook/shopify-order', async (req, res) => {
    const orderData = req.body; // البيانات اللي جاية من المتجر
    
    // هنا المفروض نحدث الداتا بيز (قاعدة البيانات)
    console.log("تم استلام طلب جديد:", orderData.id);

    // التحليل الذكي للربح
    const report = await analyzeProfitability(orderData);
    
    // إرسال التقرير (دلوقتي للكونسول، وبعدين نربطه بـ WhatsApp API)
    console.log("إشعار الواتساب للتاجر:", report);

    res.status(200).send("تم الاستلام");
});

async function analyzeProfitability(order) {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `العميل اشترى منتج بـ ${order.total_price}. الربح الصافي للطلب ده هو 30%. 
    اكتب رسالة واتساب فخمة للتاجر تبارك له على البيعة وتفكروا برصيد أرباحه اليومي.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
}

app.listen(3000, () => console.log('السيرفر شغال على البورت 3000'));