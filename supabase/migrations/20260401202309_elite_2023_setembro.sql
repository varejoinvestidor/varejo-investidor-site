-- Elite: Setembro/2023 (22 sinais, +764 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 8, 'Setembro', 22, 764, '+764 pips', 'Finalizado', array['USD/JPY', 'XAU/USD', 'WTI', 'GBP/CHF', 'EUR/JPY', 'GBP/AUD', 'NZD/USD', 'GBP/NZD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Setembro/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('USD/JPY', 'Compra', 'closed', 75, '+75 pips', 'Setembro/2023', '2023-09-04', 'Finalizado', 1, true, 'take', 'elite', 1, 146.45, 147.2, 145.65),
  ('XAU/USD', 'Venda', 'closed', 57, '+57 pips', 'Setembro/2023', '2023-09-05', 'Finalizado', 2, true, 'take', 'elite', 2, 1925.38, 1919.7, 1930.4),
  ('WTI', 'Compra', 'closed', 52, '+52 pips', 'Setembro/2023', '2023-09-06', 'Finalizado', 3, true, 'take', 'elite', 3, 0.86683, 0.872, 0.857),
  ('GBP/CHF', 'Venda', 'closed', 10, '+10 pips', 'Setembro/2023', '2023-09-06', 'Finalizado', 4, true, 'take', 'elite', 4, 1.114, 1.1105, 1.1165),
  ('EUR/JPY', 'Venda', 'closed', -144, '-144 pips', 'Setembro/2023', '2023-09-07', 'Finalizado', 5, true, 'stop', 'elite', 5, 157.122, 155.9, 158.56),
  ('XAU/USD', 'Venda', 'closed', 110, '+110 pips', 'Setembro/2023', '2023-09-11', 'Finalizado', 6, true, 'take', 'elite', 6, 1921.49, 1902.7, 1931.09),
  ('GBP/AUD', 'Compra', 'closed', 65, '+65 pips', 'Setembro/2023', '2023-09-12', 'Finalizado', 7, true, 'take', 'elite', 7, 1.9565, 1.95, 1.9415),
  ('NZD/USD', 'Compra', 'closed', 15, '+15 pips', 'Setembro/2023', '2023-09-13', 'Finalizado', 8, true, 'take', 'elite', 8, 0.592, 0.5935, 0.5895),
  ('GBP/NZD', 'Venda', 'closed', 35, '+35 pips', 'Setembro/2023', '2023-09-13', 'Finalizado', 9, true, 'take', 'elite', 9, 2.109, 2.1055, 2.11188),
  ('GBP/JPY', 'Venda', 'closed', 20, '+20 pips', 'Setembro/2023', '2023-09-14', 'Finalizado', 10, true, 'take', 'elite', 10, 182.796, 181.831, 183.834),
  ('GBP/CHF', 'Venda', 'closed', 87, '+87 pips', 'Setembro/2023', '2023-09-15', 'Finalizado', 11, true, 'take', 'elite', 11, 1.1106, 1.1019, 1.1175),
  ('AUD/USD', 'Compra', 'closed', 65, '+65 pips', 'Setembro/2023', '2023-09-18', 'Finalizado', 12, true, 'take', 'elite', 12, 0.644, 0.6505, 0.636),
  ('EUR/CHF', 'Compra', 'closed', 4, '+4 pips', 'Setembro/2023', '2023-09-19', 'Finalizado', 13, true, 'take', 'elite', 13, 0.95881, 0.9635, 0.956),
  ('GBP/JPY', 'Venda', 'closed', 49, '+49 pips', 'Setembro/2023', '2023-09-19', 'Finalizado', 14, true, 'take', 'elite', 14, 183.048, 182.56, 183.6),
  ('GBP/JPY', 'Venda', 'closed', 115, '+115 pips', 'Setembro/2023', '2023-09-20', 'Finalizado', 15, true, 'take', 'elite', 15, 182.851, 181.7, 183.7),
  ('EUR/JPY', 'Venda', 'closed', 11, '+11 pips', 'Setembro/2023', '2023-09-21', 'Finalizado', 16, true, 'take', 'elite', 16, 157.26, 155.69, 158.5),
  ('EUR/JPY', 'Venda', 'closed', 40, '+40 pips', 'Setembro/2023', '2023-09-25', 'Finalizado', 17, true, 'take', 'elite', 17, 157.541, 158.5, 155.69),
  ('EUR/USD', 'Compra', 'closed', -48, '-48 pips', 'Setembro/2023', '2023-09-26', 'Finalizado', 18, true, 'stop', 'elite', 18, 1.05625, 1.068, 1.0515),
  ('GBP/JPY', 'Compra', 'closed', 55, '+55 pips', 'Setembro/2023', '2023-09-27', 'Finalizado', 19, true, 'take', 'elite', 19, 181.554, 182.1, 181),
  ('CHF/JPY', 'Compra', 'closed', 33, '+33 pips', 'Setembro/2023', '2023-09-28', 'Finalizado', 20, true, 'take', 'elite', 20, 163.17, 163.5, 162.7),
  ('GBP/JPY', 'Compra', 'closed', 10, '+10 pips', 'Setembro/2023', '2023-09-28', 'Finalizado', 21, true, 'take', 'elite', 21, 182.265, 183.2, 181.3),
  ('XAU/USD', 'Compra', 'closed', 48, '+48 pips', 'Setembro/2023', '2023-09-29', 'Finalizado', 22, true, 'take', 'elite', 22, 1844.8, null, 1840);
