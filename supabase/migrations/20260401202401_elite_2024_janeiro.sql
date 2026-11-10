-- Elite: Janeiro/2024 (24 sinais, +587 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2024, 0, 'Janeiro', 24, 587, '+587 pips', 'Finalizado', array['EUR/AUD', 'CAD/JPY', 'EUR/CHF', 'AUD/JPY', 'EUR/GBP', 'AUD/NZD', 'GBP/USD', 'GBP/CAD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Janeiro/2024';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/AUD', 'Venda', 'closed', -66, '-66 pips', 'Janeiro/2024', '2024-01-02', 'Finalizado', 1, true, 'stop', 'elite', 2999, 1.61537, 1.5906, 1.622),
  ('CAD/JPY', 'Venda', 'closed', -40, '-40 pips', 'Janeiro/2024', '2024-01-02', 'Finalizado', 2, true, 'stop', 'elite', 3000, 106.3, 105.9, 106.7),
  ('EUR/CHF', 'Compra', 'closed', 30, '+30 pips', 'Janeiro/2024', '2024-01-02', 'Finalizado', 3, true, 'take', 'elite', 3001, 0.93, 0.933, 0.926),
  ('AUD/JPY', 'Compra', 'closed', 41, '+41 pips', 'Janeiro/2024', '2024-01-03', 'Finalizado', 4, true, 'take', 'elite', 3002, 96.189, 96.6, 95.8),
  ('EUR/GBP', 'Venda', 'closed', 23, '+23 pips', 'Janeiro/2024', '2024-01-04', 'Finalizado', 5, true, 'take', 'elite', 3003, 0.86289, 0.885, 0.8675),
  ('AUD/NZD', 'Venda', 'closed', 18, '+18 pips', 'Janeiro/2024', '2024-01-04', 'Finalizado', 6, true, 'take', 'elite', 3004, 1.07628, 1.066, 1.083),
  ('GBP/USD', 'Compra', 'closed', -45, '-45 pips', 'Janeiro/2024', '2024-01-04', 'Finalizado', 7, true, 'stop', 'elite', 3005, 1.26845, 1.2715, 1.264),
  ('GBP/CAD', 'Compra', 'closed', 54, '+54 pips', 'Janeiro/2024', '2024-01-04', 'Finalizado', 8, true, 'take', 'elite', 3006, 1.6946, 1.7, 1.685),
  ('XAU/USD', 'Compra', 'closed', -30, '-30 pips', 'Janeiro/2024', '2024-01-05', 'Finalizado', 9, true, 'stop', 'elite', 3007, 2045, 2051, 2042),
  ('GBP/CHF', 'Compra', 'closed', 67, '+67 pips', 'Janeiro/2024', '2024-01-07', 'Finalizado', 10, true, 'take', 'elite', 3008, 1.08229, 1.089, 1.077),
  ('GBP/AUD', 'Compra', 'closed', 100, '+100 pips', 'Janeiro/2024', '2024-01-08', 'Finalizado', 11, true, 'take', 'elite', 3009, 1.89964, 1.92, 1.891),
  ('EUR/CAD', 'Compra', 'closed', 11, '+11 pips', 'Janeiro/2024', '2024-01-08', 'Finalizado', 12, true, 'take', 'elite', 3010, 1.46241, 1.4635, 1.46),
  ('XAU/USD', 'Venda', 'closed', 11, '+11 pips', 'Janeiro/2024', '2024-01-09', 'Finalizado', 13, true, 'take', 'elite', 3011, 2030.19, 2022.5, 2034.9),
  ('CAD/CHF', 'Compra', 'closed', 3, '+3 pips', 'Janeiro/2024', '2024-01-09', 'Finalizado', 14, true, 'take', 'elite', 3012, 0.62691, 0.641, 0.632),
  ('EUR/JPY', 'Compra', 'closed', 47, '+47 pips', 'Janeiro/2024', '2024-01-09', 'Finalizado', 15, true, 'take', 'elite', 3013, 158.197, 158.67, 157.7),
  ('AUD/JPY', 'Compra', 'closed', 15, '+15 pips', 'Janeiro/2024', '2024-01-09', 'Finalizado', 16, true, 'take', 'elite', 3014, 96.85, 97, 96.6),
  ('XAU/USD', 'Compra', 'closed', -31, '-31 pips', 'Janeiro/2024', '2024-01-09', 'Finalizado', 17, true, 'stop', 'elite', 3015, 2031.05, 2033.5, 2028),
  ('XAU/USD', 'Compra', 'closed', -48, '-48 pips', 'Janeiro/2024', '2024-01-10', 'Finalizado', 18, true, 'stop', 'elite', 3016, 2034.77, 2040, 2030),
  ('USD/JPY', 'Compra', 'closed', 49, '+49 pips', 'Janeiro/2024', '2024-01-10', 'Finalizado', 19, true, 'take', 'elite', 3017, 145.306, 145.8, 144.59),
  ('EUR/CHF', 'Compra', 'closed', 17, '+17 pips', 'Janeiro/2024', '2024-01-10', 'Finalizado', 20, true, 'take', 'elite', 3018, 0.9335, 0.9352, 0.9305),
  ('EUR/CAD', 'Compra', 'closed', 100, '+100.4 pips', 'Janeiro/2024', '2024-01-10', 'Finalizado', 21, true, 'take', 'elite', 3019, 1.46776, 1.4778, 1.463),
  ('EUR/USD', 'Compra', 'closed', 21, '+20.9 pips', 'Janeiro/2024', '2024-01-11', 'Finalizado', 22, true, 'take', 'elite', 3020, 1.09841, 1.1005, 1.09537),
  ('CAD/JPY', 'Compra', 'closed', 139, '+138.8 pips', 'Janeiro/2024', '2024-01-11', 'Finalizado', 23, true, 'take', 'elite', 3021, 108.592, 109.98, 108.157),
  ('EUR/NZD', 'Compra', 'closed', 101, '+100.9 pips', 'Janeiro/2024', '2024-01-11', 'Finalizado', 24, true, 'take', 'elite', 3022, 1.75991, 1.77, 1.75365);
