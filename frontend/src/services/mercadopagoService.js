const mercadopago = require('mercadopago');

// Configurar credenciales de MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const createPreference = async (items, payer) => {
  const preference = {
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

  try {
    const response = await mercadopago.preferences.create(preference);
    return response.body;
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error);
    throw error;
  }
};

module.exports = {
  createPreference
};