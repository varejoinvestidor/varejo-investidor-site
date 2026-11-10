-- Elite: Abril/2021 (35 sinais, +1.114 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 3, 'Abril', 35, 1114, '+1.114 pips', 'Finalizado', array['GBP/NZD', 'EUR/AUD', 'EUR/CAD', 'XAU/USD', 'WTI', 'EUR/USD', 'GBP/USD', 'GBP/CHF']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Abril/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/NZD', 'Venda', 'closed', 40, '+40 pips', 'Abril/2021', '2021-04-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1.96775, 1.97425, 1.96028),
  ('EUR/AUD', 'Compra', 'closed', 40, '+40 pips', 'Abril/2021', '2021-04-02', 'Finalizado', 2, true, 'take', 'elite', 2, 1.54369, 1.556, 1.53928),
  ('EUR/CAD', 'Compra', 'closed', 25, '+25 pips', 'Abril/2021', '2021-04-05', 'Finalizado', 3, true, 'take', 'elite', 3, 1.47873, 1.48381, 1.47336),
  ('XAU/USD', 'Compra', 'closed', 35, '+35 pips', 'Abril/2021', '2021-04-06', 'Finalizado', 4, true, 'take', 'elite', 4, 1738.48, 1745.76, 1731.84),
  ('EUR/AUD', 'Compra', 'closed', 52, '+52 pips', 'Abril/2021', '2021-04-06', 'Finalizado', 5, true, 'take', 'elite', 5, 1.54926, 1.55444, 1.54272),
  ('WTI', 'Venda', 'closed', 60, '+60 pips', 'Abril/2021', '2021-04-07', 'Finalizado', 6, true, 'take', 'elite', 6, 0.59344, 0.58207, 0.60023),
  ('EUR/USD', 'Venda', 'closed', -36, '-36 pips', 'Abril/2021', '2021-04-07', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.18608, 1.183, 1.18963),
  ('GBP/USD', 'Compra', 'closed', 34, '+34 pips', 'Abril/2021', '2021-04-07', 'Finalizado', 8, true, 'take', 'elite', 8, 1.37466, 1.37801, 1.37207),
  ('GBP/CHF', 'Compra', 'closed', -45, '-45 pips', 'Abril/2021', '2021-04-08', 'Finalizado', 9, true, 'stop', 'elite', 9, 1.27006, 1.27593, 1.26555),
  ('AUD/CAD', 'Venda', 'closed', 23, '+23 pips', 'Abril/2021', '2021-04-09', 'Finalizado', 10, true, 'take', 'elite', 10, 0.95778, 0.93872, 0.97625),
  ('EUR/CAD', 'Compra', 'closed', 67, '+67 pips', 'Abril/2021', '2021-04-12', 'Finalizado', 11, true, 'take', 'elite', 11, 1.49352, 1.50178, 1.48671),
  ('GBP/CHF', 'Compra', 'closed', -64, '-64 pips', 'Abril/2021', '2021-04-12', 'Finalizado', 12, true, 'stop', 'elite', 12, 1.27131, 1.26682, 1.27771),
  ('GBP/JPY', 'Compra', 'closed', 37, '+37 pips', 'Abril/2021', '2021-04-12', 'Finalizado', 13, true, 'take', 'elite', 13, 150.546, 150.113, 150.838),
  ('GBP/CHF', 'Compra', 'closed', 45, '+45 pips', 'Abril/2021', '2021-04-12', 'Finalizado', 14, true, 'take', 'elite', 14, 1.26005, 1.27617, 1.26489),
  ('NZD/CAD', 'Compra', 'closed', 69, '+69 pips', 'Abril/2021', '2021-04-13', 'Finalizado', 15, true, 'take', 'elite', 15, 0.88468, 0.89162, 0.88057),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Abril/2021', '2021-04-14', 'Finalizado', 16, true, 'take', 'elite', 16, 1737.33, 1740.3, 1734.5),
  ('GBP/CHF', 'Compra', 'closed', -57, '-57 pips', 'Abril/2021', '2021-04-14', 'Finalizado', 17, true, 'stop', 'elite', 17, 1.27236, 1.28, 1.26668),
  ('EUR/JPY', 'Venda', 'closed', 50, '+50 pips', 'Abril/2021', '2021-04-15', 'Finalizado', 18, true, 'take', 'elite', 18, 130.021, 129.524, 130.316),
  ('USD/CAD', 'Compra', 'closed', 30, '+30 pips', 'Abril/2021', '2021-04-15', 'Finalizado', 19, true, 'take', 'elite', 19, 1.2555, 1.26174, 1.24678),
  ('CAD/CHF', 'Venda', 'closed', 20, '+20 pips', 'Abril/2021', '2021-04-16', 'Finalizado', 20, true, 'take', 'elite', 20, 0.73435, 0.73231, 0.73681),
  ('EUR/AUD', 'Compra', 'closed', 44, '+44 pips', 'Abril/2021', '2021-04-16', 'Finalizado', 21, true, 'take', 'elite', 21, 1.54908, 1.55834, 1.54152),
  ('EUR/AUD', 'Compra', 'closed', 40, '+40 pips', 'Abril/2021', '2021-04-19', 'Finalizado', 22, true, 'take', 'elite', 22, null, null, null),
  ('EUR/AUD', 'Compra', 'closed', 70, '+70 pips', 'Abril/2021', '2021-04-18', 'Finalizado', 23, true, 'take', 'elite', 23, null, null, null),
  ('USD/CHF', 'Venda', 'closed', -20, '-20 pips', 'Abril/2021', '2021-04-20', 'Finalizado', 24, true, 'stop', 'elite', 24, 0.91603, 0.91417, 0.91807),
  ('GBP/CAD', 'Compra', 'closed', 31, '+31 pips', 'Abril/2021', '2021-04-21', 'Finalizado', 25, true, 'take', 'elite', 25, 1.74121, 1.74429, 1.7389),
  ('EUR/AUD', 'Compra', 'closed', 61, '+61 pips', 'Abril/2021', '2021-04-22', 'Finalizado', 26, true, 'take', 'elite', 26, 1.55964, 1.5657, 1.55366),
  ('WTI', 'Compra', 'closed', 65, '+65 pips', 'Abril/2021', '2021-04-23', 'Finalizado', 27, true, 'take', 'elite', 27, 0.61927, 0.61274, 0.62315),
  ('USD/JPY', 'Compra', 'closed', 38, '+38 pips', 'Abril/2021', '2021-04-26', 'Finalizado', 28, true, 'take', 'elite', 28, 108.039, 108.418, 107.824),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Abril/2021', '2021-04-26', 'Finalizado', 29, true, 'take', 'elite', 29, 1776.56, 1769.02, 1783.85),
  ('AUD/CAD', 'Venda', 'closed', 89, '+89 pips', 'Abril/2021', '2021-04-27', 'Finalizado', 30, true, 'take', 'elite', 30, 0.96391, 0.95497, 0.97064),
  ('EUR/AUD', 'Compra', 'closed', 50, '+50 pips', 'Abril/2021', '2021-04-27', 'Finalizado', 31, true, 'take', 'elite', 31, 1.55639, 1.56351, 1.55054),
  ('XAU/USD', 'Compra', 'closed', -130, '-130 pips', 'Abril/2021', '2021-04-28', 'Finalizado', 32, true, 'stop', 'elite', 32, 1789.64, 1808.53, 1776.63),
  ('GBP/CAD', 'Compra', 'closed', 56, '+55.8 pips', 'Abril/2021', '2021-04-29', 'Finalizado', 33, true, 'take', 'elite', 33, 1.71737, 1.72295, 1.71394),
  ('EUR/AUD', 'Compra', 'closed', 195, '+195 pips', 'Abril/2021', '2021-04-30', 'Finalizado', 34, true, 'take', 'elite', 34, 1.5605, 1.58, 1.5525),
  ('AUD/CAD', 'Venda', 'closed', 30, '+30 pips', 'Abril/2021', '2021-04-30', 'Finalizado', 35, true, 'take', 'elite', 35, 0.95019, 0.9104, 0.96769);
