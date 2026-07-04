const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. تعريف الدالة هنا (تأكد إن الاسم مطابقة)
async function analyzeProfitability(order) {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `حلل البيانات دي: ${JSON.stringify(order)}...`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}

// 2. تصدير الدالة بعد ما اتعرفت (ده السطر اللي كان بيعمل مشكلة)
module.exports = { analyzeProfitability };
