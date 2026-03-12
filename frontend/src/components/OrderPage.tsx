import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PizzaOrder {
  customerId: string;
  pizzaType: string;
  size: string;
  extras: string[];
  spicy: number;
  quantity: number;
  notes: string;
}

export const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [order, setOrder] = useState<PizzaOrder>({
    customerId: '',
    pizzaType: '',
    size: '',
    extras: [],
    spicy: 30,
    quantity: 1,
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handlePizzaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder((prev) => ({ ...prev, pizzaType: e.target.value }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prev) => ({ ...prev, size: e.target.value }));
  };

  const handleExtraChange = (extra: string) => {
    setOrder((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const handleSpicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prev) => ({ ...prev, spicy: parseInt(e.target.value) }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prev) => ({ ...prev, quantity: parseInt(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('pizza.success'));
    console.log('Order submitted:', order);
  };

  const resetForm = () => {
    setOrder({
      customerId: '',
      pizzaType: '',
      size: '',
      extras: [],
      spicy: 30,
      quantity: 1,
      notes: '',
    });
  };

  return (
    <div className="order-page">
      <h1 className="order-title">{t('pizza.title')}</h1>
      <p className="order-description">{t('pizza.description')}</p>

      <form className="order-form" onSubmit={handleSubmit}>
        {/* Text Input for Customer ID */}
        <div className="form-group">
          <label htmlFor="customerId">{t('pizza.customerId')}</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={order.customerId}
            onChange={handleInputChange}
            placeholder={t('pizza.customerIdPlaceholder')}
          />
        </div>

        {/* Select Box for Pizza Type */}
        <div className="form-group">
          <label htmlFor="pizzaType">{t('pizza.pizzaSelection')}</label>
          <select
            id="pizzaType"
            name="pizzaType"
            value={order.pizzaType}
            onChange={handlePizzaTypeChange}
          >
            <option value="">{t('forms.selectSize')}</option>
            <option value="margherita">{t('pizza.pizzas.margherita')}</option>
            <option value="pepperoni">{t('pizza.pizzas.pepperoni')}</option>
            <option value="vegetariana">{t('pizza.pizzas.vegetariana')}</option>
            <option value="quattro">{t('pizza.pizzas.quattro')}</option>
            <option value="prosciutto">{t('pizza.pizzas.prosciutto')}</option>
          </select>
        </div>

        {/* Radio Buttons for Size */}
        <fieldset className="form-group">
          <legend>{t('pizza.size')}</legend>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="size"
                value="small"
                checked={order.size === 'small'}
                onChange={handleSizeChange}
              />
              {t('pizza.sizeSmall')}
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="medium"
                checked={order.size === 'medium'}
                onChange={handleSizeChange}
              />
              {t('pizza.sizeMedium')}
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="large"
                checked={order.size === 'large'}
                onChange={handleSizeChange}
              />
              {t('pizza.sizeLarge')}
            </label>
          </div>
        </fieldset>

        {/* Radio Boxes */}
        <fieldset className="form-group">
          <legend>{t('pizza.extras')}</legend>
          <div className="radio-group">
            <label>
              <input
                type="checkbox"
                checked={order.extras.includes('mushrooms')}
                onChange={() => handleExtraChange('mushrooms')}
              />
              {t('pizza.extraMushrooms')}
            </label>
            <label>
              <input
                type="checkbox"
                checked={order.extras.includes('olives')}
                onChange={() => handleExtraChange('olives')}
              />
              {t('pizza.extraOlives')}
            </label>
            <label>
              <input
                type="checkbox"
                checked={order.extras.includes('onions')}
                onChange={() => handleExtraChange('onions')}
              />
              {t('pizza.extraOnions')}
            </label>
            <label>
              <input
                type="checkbox"
                checked={order.extras.includes('pepperoni')}
                onChange={() => handleExtraChange('pepperoni')}
              />
              {t('pizza.extraPepperoni')}
            </label>
          </div>
        </fieldset>

        {/* Slider for Spiciness */}
        <div className="form-group">
          <label htmlFor="spicy">{t('pizza.spicy')}</label>
          <div className="slider-container">
            <input
              type="range"
              id="spicy"
              name="spicy"
              min="0"
              max="100"
              value={order.spicy}
              onChange={handleSpicyChange}
              aria-label={t('pizza.spicyLabel')}
            />
            <span className="slider-value">{order.spicy}%</span>
          </div>
        </div>

        {/* Number Input */}
        <div className="form-group">
          <label htmlFor="quantity">{t('pizza.quantity')}</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            value={order.quantity}
            onChange={handleQuantityChange}
          />
        </div>

        {/* Textarea */}
        <div className="form-group">
          <label htmlFor="notes">{t('pizza.notes')}</label>
          <textarea
            id="notes"
            name="notes"
            value={order.notes}
            onChange={handleInputChange}
            placeholder={t('pizza.notesPlaceholder')}
            rows={4}
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {t('pizza.submit')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            {t('pizza.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};
