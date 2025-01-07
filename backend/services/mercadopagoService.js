const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const createPreference = async (items, payer) => {
  try {
    const preference = new Preference(client);
    
    const preferenceData = {
      items: items.map(item => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
        currency_id: 'UYU', // Moneda uruguaya
        picture_url: item.imageUrl
      })),
      payer: {
        name: payer.name,
        email: payer.email
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`
      },
      auto_return: 'approved',
      binary_mode: true,
      external_reference: `ORDER_${Date.now()}`
    };

    const response = await preference.create({ body: preferenceData });
    return response;
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error);
    throw error;
  }
};

module.exports = {
  createPreference
};