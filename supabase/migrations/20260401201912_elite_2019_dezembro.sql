-- Elite: Dezembro/2019 (28 sinais, +621 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2019, 11, 'Dezembro', 28, 621, '+621 pips', 'Finalizado', array['GBP/NZD', 'EUR/CAD', 'WTI', 'XAU/USD', 'GBP/USD', 'EUR/NZD', 'EUR/GBP', 'EUR/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Dezembro/2019';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/NZD', 'Venda', 'closed', -27, '-27 pips', 'Dezembro/2019', '2019-12-02', 'Finalizado', 1, true, 'stop', 'elite', 1, 1.99518, 1.9923, 1.99786),
  ('EUR/CAD', 'Compra', 'closed', 63, '+63 pips', 'Dezembro/2019', '2019-12-02', 'Finalizado', 2, true, 'take', 'elite', 2, 1.4643, null, null),
  ('WTI', 'Venda', 'closed', 67, '+67 pips', 'Dezembro/2019', '2019-12-03', 'Finalizado', 3, true, 'take', 'elite', 3, 0.55859, 0.55192, 0.562),
  ('XAU/USD', 'Venda', 'closed', -19, '-19 pips', 'Dezembro/2019', '2019-12-03', 'Finalizado', 4, true, 'stop', 'elite', 4, 1468.91, 1466.62, 1470.82),
  ('XAU/USD', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2019', '2019-12-03', 'Finalizado', 5, true, 'take', 'elite', 5, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Dezembro/2019', '2019-12-03', 'Finalizado', 6, true, 'take', 'elite', 6, null, null, null),
  ('GBP/USD', 'Compra', 'closed', 60, '+60 pips', 'Dezembro/2019', '2019-12-04', 'Finalizado', 7, true, 'take', 'elite', 7, 1.305, 1.313, 1.2987),
  ('EUR/NZD', 'Venda', 'closed', 90, '+90 pips', 'Dezembro/2019', '2019-12-04', 'Finalizado', 8, true, 'take', 'elite', 8, 1.69895, 1.68992, 1.702),
  ('EUR/GBP', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2019', '2019-12-04', 'Finalizado', 9, true, 'take', 'elite', 9, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 20, '+20 pips', 'Dezembro/2019', '2019-12-04', 'Finalizado', 10, true, 'take', 'elite', 10, null, null, null),
  ('EUR/NZD', 'Venda', 'closed', 60, '+60 pips', 'Dezembro/2019', '2019-12-04', 'Finalizado', 11, true, 'take', 'elite', 11, null, null, null),
  ('EUR/GBP', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2019', '2019-12-04', 'Finalizado', 12, true, 'take', 'elite', 12, null, null, null),
  ('EUR/USD', 'Compra', 'closed', 65, '+65 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 13, true, 'take', 'elite', 13, 1.1095, 1.116, 1.1045),
  ('GBP/USD', 'Compra', 'closed', 74, '+74 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 14, true, 'take', 'elite', 14, 1.3136, 1.321, 1.3081),
  ('USD/JPY', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 15, true, 'take', 'elite', 15, 108.778, 107.9, 109.33),
  ('XAU/USD', 'Venda', 'closed', -20, '-20 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 16, true, 'stop', 'elite', 16, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 20, '+20 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 17, true, 'take', 'elite', 17, null, null, null),
  ('XAG/USD', 'Compra', 'closed', 1, '+1 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 18, true, 'take', 'elite', 18, 169.76, 171.2, 168.97),
  ('USD/CHF', 'Venda', 'closed', 37, '+37 pips', 'Dezembro/2019', '2019-12-05', 'Finalizado', 19, true, 'take', 'elite', 19, 0.98649, 0.98275, 0.98861),
  ('XAU/USD', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2019', '2019-12-06', 'Finalizado', 20, true, 'stop', 'elite', 20, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 38, '+38 pips', 'Dezembro/2019', '2019-12-06', 'Finalizado', 21, true, 'take', 'elite', 21, 1467.1, 1463.27, null),
  ('XAU/USD', 'Venda', 'closed', 31, '+31 pips', 'Dezembro/2019', '2019-12-06', 'Finalizado', 22, true, 'take', 'elite', 22, 1475.89, 1472.76, null),
  ('EUR/USD', 'Venda', 'closed', 12, '+12 pips', 'Dezembro/2019', '2019-12-06', 'Finalizado', 23, true, 'take', 'elite', 23, 1.1083, 1.1071, 1.11016),
  ('GBP/USD', 'Compra', 'closed', 24, '+24 pips', 'Dezembro/2019', '2019-12-06', 'Finalizado', 24, true, 'take', 'elite', 24, 1.3111, 1.3154, 1.31014),
  ('GBP/USD', 'Compra', 'closed', -10, '-10 pips', 'Dezembro/2019', '2019-12-09', 'Finalizado', 25, true, 'stop', 'elite', 25, 1.31856, 1.32589, 1.31439),
  ('XAU/USD', 'Compra', 'closed', -22, '-22 pips', 'Dezembro/2019', '2019-12-09', 'Finalizado', 26, true, 'stop', 'elite', 26, 1462.5, 1465, 1460.29),
  ('XAU/USD', 'Venda', 'closed', -57, '-57 pips', 'Dezembro/2019', '2019-12-09', 'Finalizado', 27, true, 'stop', 'elite', 27, 1460.13, 1445.3, 1465.81),
  ('GBP/USD', 'Compra', 'closed', -26, '-26 pips', 'Dezembro/2019', '2019-12-10', 'Finalizado', 28, true, 'stop', 'elite', 28, 1.31856, 1.326, 1.31529);
