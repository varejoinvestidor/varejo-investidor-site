-- Elite: Agosto/2021 (31 sinais, +646 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 7, 'Agosto', 31, 646, '+646 pips', 'Finalizado', array['GBP/JPY', 'XAU/USD', 'GBP/CAD', 'USD/CAD', 'AUD/CAD', 'EUR/CAD', 'GBP/USD', 'EUR/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Agosto/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/JPY', 'Venda', 'closed', 50, '+50 pips', 'Agosto/2021', '2021-08-02', 'Finalizado', 1, true, 'take', 'elite', 1, 151.893, 150.739, 152.543),
  ('XAU/USD', 'Venda', 'closed', 30, '+30 pips', 'Agosto/2021', '2021-08-02', 'Finalizado', 2, true, 'take', 'elite', 2, 1810.29, 1803.42, 1814.75),
  ('GBP/CAD', 'Compra', 'closed', 68, '+68 pips', 'Agosto/2021', '2021-08-02', 'Finalizado', 3, true, 'take', 'elite', 3, 1.73785, 1.7825, 1.7126),
  ('XAU/USD', 'Venda', 'closed', -31, '-31 pips', 'Agosto/2021', '2021-08-03', 'Finalizado', 4, true, 'stop', 'elite', 4, 1809.87, 1806.72, 1813.01),
  ('XAU/USD', 'Compra', 'closed', -26, '-26 pips', 'Agosto/2021', '2021-08-04', 'Finalizado', 5, true, 'stop', 'elite', 5, 1812.57, 1817, 1810),
  ('USD/CAD', 'Compra', 'closed', 18, '+17.6 pips', 'Agosto/2021', '2021-08-06', 'Finalizado', 6, true, 'take', 'elite', 6, null, null, null),
  ('AUD/CAD', 'Compra', 'closed', 5, '+5.4 pips', 'Agosto/2021', '2021-08-06', 'Finalizado', 7, true, 'take', 'elite', 7, null, null, null),
  ('EUR/CAD', 'Compra', 'closed', 13, '+12.9 pips', 'Agosto/2021', '2021-08-06', 'Finalizado', 8, true, 'take', 'elite', 8, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 97, '+97 pips', 'Agosto/2021', '2021-08-06', 'Finalizado', 9, true, 'take', 'elite', 9, null, null, null),
  ('GBP/USD', 'Venda', 'closed', 1, '+1.3 pips', 'Agosto/2021', '2021-08-06', 'Finalizado', 10, true, 'take', 'elite', 10, null, null, null),
  ('EUR/USD', 'Venda', 'closed', 5, '+5.2 pips', 'Agosto/2021', '2021-08-06', 'Finalizado', 11, true, 'take', 'elite', 11, null, null, null),
  ('USD/CAD', 'Compra', 'closed', -51, '-51 pips', 'Agosto/2021', '2021-08-09', 'Finalizado', 12, true, 'stop', 'elite', 12, 1.25829, 1.27491, 1.25321),
  ('EUR/GBP', 'Compra', 'closed', 30, '+30 pips', 'Agosto/2021', '2021-08-10', 'Finalizado', 13, true, 'take', 'elite', 13, 0.84715, 0.8501, 0.8455),
  ('EUR/AUD', 'Compra', 'closed', -52, '-52 pips', 'Agosto/2021', '2021-08-10', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.5962, 1.6024, 1.591),
  ('GBP/JPY', 'Venda', 'closed', 69, '+69 pips', 'Agosto/2021', '2021-08-11', 'Finalizado', 15, true, 'take', 'elite', 15, 153.058, 152.369, 153.634),
  ('EUR/CAD', 'Compra', 'closed', 30, '+30 pips', 'Agosto/2021', '2021-08-12', 'Finalizado', 16, true, 'take', 'elite', 16, 1.46982, 1.47588, 1.4652),
  ('EUR/GBP', 'Compra', 'closed', 15, '+15 pips', 'Agosto/2021', '2021-08-16', 'Finalizado', 17, true, 'take', 'elite', 17, 0.85154, 0.85477, 0.84948),
  ('EUR/CAD', 'Compra', 'closed', 43, '+43 pips', 'Agosto/2021', '2021-08-16', 'Finalizado', 18, true, 'take', 'elite', 18, 1.48232, 1.4866, 1.47814),
  ('EUR/NZD', 'Compra', 'closed', 60, '+60 pips', 'Agosto/2021', '2021-08-17', 'Finalizado', 19, true, 'take', 'elite', 19, 1.6935, 1.70191, 1.68577),
  ('GBP/CAD', 'Compra', 'closed', 40, '+40 pips', 'Agosto/2021', '2021-08-19', 'Finalizado', 20, true, 'take', 'elite', 20, 1.74131, 1.74937, 1.73387),
  ('USD/CAD', 'Venda', 'closed', 48, '+48 pips', 'Agosto/2021', '2021-08-19', 'Finalizado', 21, true, 'take', 'elite', 21, 1.28211, 1.27729, 1.28474),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Agosto/2021', '2021-08-20', 'Finalizado', 22, true, 'take', 'elite', 22, 1782.44, 1770, 1787.44),
  ('GBP/CAD', 'Compra', 'closed', -25, '-25 pips', 'Agosto/2021', '2021-08-23', 'Finalizado', 23, true, 'stop', 'elite', 23, 1.73624, 1.74, 1.73372),
  ('USD/CAD', 'Compra', 'closed', 30, '+30 pips', 'Agosto/2021', '2021-08-24', 'Finalizado', 24, true, 'take', 'elite', 24, 1.25938, 1.26514, 1.2557),
  ('GBP/USD', 'Venda', 'closed', 15, '+15 pips', 'Agosto/2021', '2021-08-25', 'Finalizado', 25, true, 'take', 'elite', 25, 1.37, 1.343, 1.388),
  ('EUR/CHF', 'Compra', 'closed', 22, '+22 pips', 'Agosto/2021', '2021-08-25', 'Finalizado', 26, true, 'take', 'elite', 26, 1.07425, 1.07647, 1.07218),
  ('EUR/AUD', 'Compra', 'closed', 57, '+57 pips', 'Agosto/2021', '2021-08-25', 'Finalizado', 27, true, 'take', 'elite', 27, 1.61979, 1.6255, 1.616),
  ('EUR/AUD', 'Compra', 'closed', 20, '+20 pips', 'Agosto/2021', '2021-08-25', 'Finalizado', 28, true, 'take', 'elite', 28, null, null, null),
  ('CAD/CHF', 'Venda', 'closed', 32, '+32 pips', 'Agosto/2021', '2021-08-27', 'Finalizado', 29, true, 'take', 'elite', 29, 0.72211, 0.7189, 0.72554),
  ('EUR/CAD', 'Compra', 'closed', -37, '-37 pips', 'Agosto/2021', '2021-08-29', 'Finalizado', 30, true, 'stop', 'elite', 30, 1.49069, 1.494, 1.487),
  ('EUR/CAD', 'Compra', 'closed', 30, '+30 pips', 'Agosto/2021', '2021-08-31', 'Finalizado', 31, true, 'take', 'elite', 31, 1.49102, 1.494, 1.487);
