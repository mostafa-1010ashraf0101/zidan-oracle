const express = require('express');
const app = express();
app.use(express.json());

// استدعاء الموديول مباشرة
const engine = require('./profit_engine');

app.post('/webhook/shopify-order', async (req, res) => {
    try {
        const orderData = req.body;
        // استخدام الدالة من خلال الـ engine object
        const report = await engine.analyzeProfitability(orderData);
        
        console.log("إشعار الواتساب للتاجر:", report);
        res.status(200).send("تم الاستلام بنجاح");
    } catch (error) {
        console.error("خطأ في المعالجة:", error);
        res.status(500).send("خطأ داخلي");
    }
});

// Render بيحتاج الـ Port ده عشان يشتغل، اتأكد إنك حاطه
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`السيرفر شغال على بورت ${PORT}`));
