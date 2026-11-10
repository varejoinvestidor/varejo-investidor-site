-- Elite: Junho/2023 (24 sinais, -306 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 5, 'Junho', 24, -306, '-306 pips', 'Finalizado', array['EUR/JPY', 'GBP/AUD', 'EUR/AUD', 'USD/JPY', 'CHF/JPY', 'EUR/NZD', 'XAU/USD', 'GBP/CAD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Junho/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/JPY', 'Compra', 'closed', 51, '+51 pips', 'Junho/2023', '2023-06-01', 'Finalizado', 1, true, 'take', 'elite', 1, 148.995, 149.5, 148.5),
  ('GBP/AUD', 'Venda', 'closed', 20, '+20 pips', 'Junho/2023', '2023-06-01', 'Finalizado', 2, true, 'take', 'elite', 2, 1.904, 1.902, 1.90668),
  ('EUR/AUD', 'Venda', 'closed', 55, '+55 pips', 'Junho/2023', '2023-06-01', 'Finalizado', 3, true, 'take', 'elite', 3, 1.63465, 1.621, 1.64998),
  ('USD/JPY', 'Compra', 'closed', 27, '+27 pips', 'Junho/2023', '2023-06-02', 'Finalizado', 4, true, 'take', 'elite', 4, 139.372, 139.64, 139.15),
  ('CHF/JPY', 'Compra', 'closed', -60, '-60 pips', 'Junho/2023', '2023-06-05', 'Finalizado', 5, true, 'stop', 'elite', 5, 154.2, 155.3, 153.6),
  ('EUR/NZD', 'Venda', 'closed', -39, '-39 pips', 'Junho/2023', '2023-06-05', 'Finalizado', 6, true, 'stop', 'elite', 6, 1.76212, 1.756, 1.766),
  ('XAU/USD', 'Compra', 'closed', -50, '-50 pips', 'Junho/2023', '2023-06-06', 'Finalizado', 7, true, 'stop', 'elite', 7, 1964, 1975, 1959),
  ('GBP/CAD', 'Compra', 'closed', 32, '+32 pips', 'Junho/2023', '2023-06-07', 'Finalizado', 8, true, 'take', 'elite', 8, 1.66328, 1.6665, 1.65969),
  ('EUR/GBP', 'Venda', 'closed', 2, '+2 pips', 'Junho/2023', '2023-06-08', 'Finalizado', 9, true, 'take', 'elite', 9, 0.85908, 0.8577, 0.8612),
  ('GBP/AUD', 'Compra', 'closed', -60, '-60 pips', 'Junho/2023', '2023-06-08', 'Finalizado', 10, true, 'stop', 'elite', 10, 1.871, 1.886, 1.865),
  ('USD/CHF', 'Compra', 'closed', 25, '+25 pips', 'Junho/2023', '2023-06-08', 'Finalizado', 11, true, 'take', 'elite', 11, 0.8995, 0.902, 0.897),
  ('XAU/USD', 'Compra', 'closed', -99, '-99 pips', 'Junho/2023', '2023-06-09', 'Finalizado', 12, true, 'stop', 'elite', 12, 1965.55, 1976, 1955.69),
  ('XAU/USD', 'Compra', 'closed', -96, '-96 pips', 'Junho/2023', '2023-06-12', 'Finalizado', 13, true, 'stop', 'elite', 13, 1965.32, 1976, 1955.69),
  ('GBP/AUD', 'Compra', 'closed', -52, '-52 pips', 'Junho/2023', '2023-06-13', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.86316, 1.87634, 1.858),
  ('NZD/JPY', 'Venda', 'closed', -27, '-27 pips', 'Junho/2023', '2023-06-15', 'Finalizado', 15, true, 'stop', 'elite', 15, 87.4, 87.1, 87.67),
  ('XAU/USD', 'Venda', 'closed', 42, '+42 pips', 'Junho/2023', '2023-06-16', 'Finalizado', 16, true, 'take', 'elite', 16, 1958.23, 1954, 1964),
  ('USD/CAD', 'Compra', 'closed', 23, '+23 pips', 'Junho/2023', '2023-06-19', 'Finalizado', 17, true, 'take', 'elite', 17, 1.31967, 1.322, 1.317),
  ('GBP/CHF', 'Compra', 'closed', 18, '+18 pips', 'Junho/2023', '2023-06-20', 'Finalizado', 18, true, 'take', 'elite', 18, 1.14642, 1.1482, 1.1445),
  ('EUR/USD', 'Compra', 'closed', -53, '-53 pips', 'Junho/2023', '2023-06-20', 'Finalizado', 19, true, 'stop', 'elite', 19, 1.09932, 1.1045, 1.094),
  ('EUR/AUD', 'Venda', 'closed', -57, '-57 pips', 'Junho/2023', '2023-06-20', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.61534, 1.6095, 1.621),
  ('GBP/USD', 'Venda', 'closed', 64, '+64 pips', 'Junho/2023', '2023-06-26', 'Finalizado', 21, true, 'take', 'elite', 21, 1.2704, 1.264, 1.273),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Junho/2023', '2023-06-27', 'Finalizado', 22, true, 'take', 'elite', 22, 1917.86, 1924.84, 1924.84),
  ('XAU/USD', 'Venda', 'closed', -51, '-51 pips', 'Junho/2023', '2023-06-28', 'Finalizado', 23, true, 'stop', 'elite', 23, 1906.23, 1890.62, 1911.28),
  ('XAU/USD', 'Venda', 'closed', -51, '-51 pips', 'Junho/2023', '2023-06-28', 'Finalizado', 24, true, 'stop', 'elite', 24, 1906.23, 1890.62, 1911.28);
