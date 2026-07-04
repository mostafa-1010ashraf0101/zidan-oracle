const express = require('express');
// استدعاء الدالة من ملفها الخاص
const { analyzeProfitability } = require('./profit_engine'); 

const app = express();
app.use(express.json());

app.post('/webhook/shopify-order', async (req, res) => {
    const orderData = req.body;
    
    // هنا بنستخدم الدالة اللي استدعيناها
    const report = await analyzeProfitability(orderData);
    
    console.log("إشعار الواتساب للتاجر:", report);
    res.status(200).send("تم الاستلام");
});

app.listen(3000, () => console.log('السيرفر شغال'));
