// Zidan WhatsApp-Oracle (المنتج النهائي)
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: 'AIzaSyBxJQIuYat7DgRIT-cOLJ02yw_CTtK_BTQ' });

async function sendWhatsAppReport(data) {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // تحسين البرومبت عشان يكون 'إدماني'
    const prompt = `
    أنت نظام Zidan Oracle. التاجر بيستلم التقرير ده على الواتساب كل يوم.
    البيانات: ${JSON.stringify(data)}
    الربح الصافي = (المبيعات - الصرف - الشحن - تكلفة البضاعة).
    
    اكتب رسالة واتساب (قصيرة جداً، فخمة، ومباشرة):
    1. ابدأ برقم الربح الصافي.
    2. ادي 'نصيحة ذهبية' في سطر واحد بناءً على الأرقام.
    3. خلي التاجر يحس إنه "محترف".
    `;

    const result = await model.generateContent(prompt);
    
    // هنا مكان ربط API الواتساب (قريباً)
    console.log("--- إشعار واتساب للتاجر ---");
    console.log(result.response.text());
    console.log("--------------------------");
}

const dailyData = { sales: 22000, adsSpend: 6000, shipping: 1500, cogs: 8000 };
sendWhatsAppReport(dailyData);

module.exports = { analyzeProfitability };