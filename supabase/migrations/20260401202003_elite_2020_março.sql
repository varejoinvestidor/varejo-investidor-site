-- Elite: Março/2020 (19 sinais, +1.222 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2020, 2, 'Março', 19, 1222, '+1.222 pips', 'Finalizado', array['EUR/CAD', 'EUR/JPY', 'XAU/USD', 'WTI', 'USD/JPY', 'NZD/CAD', 'EUR/USD', 'EUR/GBP']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Março/2020';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/CAD', 'Compra', 'closed', 60, '+60 pips', 'Março/2020', '2020-03-16', 'Finalizado', 1, true, 'take', 'elite', 1, 1.553, 1.547, 1.558),
  ('EUR/JPY', 'Compra', 'closed', 32, '+32 pips', 'Março/2020', '2020-03-16', 'Finalizado', 2, true, 'take', 'elite', 2, 117.899, 118.215, 117.7),
  ('XAU/USD', 'Compra', 'closed', 152, '+152 pips', 'Março/2020', '2020-03-16', 'Finalizado', 3, true, 'take', 'elite', 3, 1473.17, 1488.41, 1468.05),
  ('WTI', 'Venda', 'closed', 207, '+207 pips', 'Março/2020', '2020-03-17', 'Finalizado', 4, true, 'take', 'elite', 4, 0.29468, 0.26, 0.2994),
  ('USD/JPY', 'Compra', 'closed', 44, '+44 pips', 'Março/2020', '2020-03-17', 'Finalizado', 5, true, 'take', 'elite', 5, 106.929, 107.368, 106.409),
  ('XAU/USD', 'Compra', 'closed', 164, '+164 pips', 'Março/2020', '2020-03-17', 'Finalizado', 6, true, 'take', 'elite', 6, 1528.6, 1545, 1515),
  ('NZD/CAD', 'Compra', 'closed', -32, '-32 pips', 'Março/2020', '2019-03-18', 'Finalizado', 7, true, 'stop', 'elite', 7, 0.8432, 0.8469, 0.84),
  ('EUR/USD', 'Compra', 'closed', 28, '+28 pips', 'Março/2020', '2020-03-18', 'Finalizado', 8, true, 'take', 'elite', 8, 1.08076, 1.078, 1.0833),
  ('EUR/USD', 'Compra', 'closed', 80, '+80 pips', 'Março/2020', '2020-03-23', 'Finalizado', 9, true, 'take', 'elite', 9, 1.067, 1.075, 1.06),
  ('EUR/GBP', 'Compra', 'closed', 20, '+20 pips', 'Março/2020', '2020-03-24', 'Finalizado', 10, true, 'take', 'elite', 10, 0.925, 0.927, 0.923),
  ('GBP/CHF', 'Compra', 'closed', 42, '+42 pips', 'Março/2020', '2020-03-24', 'Finalizado', 11, true, 'take', 'elite', 11, 1.1458, 1.15, 1.1425),
  ('XAU/USD', 'Compra', 'closed', 110, '+110 pips', 'Março/2020', '3030-03-24', 'Finalizado', 12, true, 'take', 'elite', 12, 1608.75, 1669.24, 1569.13),
  ('XAU/USD', 'Compra', 'closed', 190, '+190 pips', 'Março/2020', '2020-03-25', 'Finalizado', 13, true, 'take', 'elite', 13, 1619.25, 1662.32, 1581.72),
  ('GBP/USD', 'Compra', 'closed', -40, '-40 pips', 'Março/2020', '2020-03-25', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.184, 1.188, 1.18),
  ('WTI', 'Venda', 'closed', 91, '+91 pips', 'Março/2020', '2020-03-26', 'Finalizado', 15, true, 'take', 'elite', 15, 0.2445, 0.2265, 0.24977),
  ('WTI', 'Compra', 'closed', 20, '+20 pips', 'Março/2020', '2020-03-27', 'Finalizado', 16, true, 'take', 'elite', 16, 0.2282, 0.23532, 0.22168),
  ('GBP/NZD', 'Compra', 'closed', 100, '+100 pips', 'Março/2020', '2020-03-30', 'Finalizado', 17, true, 'take', 'elite', 17, 2.052, 2.08, 2.056),
  ('XAU/USD', 'Compra', 'closed', -56, '-56 pips', 'Março/2020', '2020-03-30', 'Finalizado', 18, true, 'stop', 'elite', 18, 1622.64, 1632.93, 1617.08),
  ('CAD/CHF', 'Venda', 'closed', 10, '+10 pips', 'Março/2020', '2020-03-31', 'Finalizado', 19, true, 'take', 'elite', 19, 0.67537, 0.6705, 0.67769);
