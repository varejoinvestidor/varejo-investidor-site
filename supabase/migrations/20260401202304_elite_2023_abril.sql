-- Elite: Abril/2023 (37 sinais, +322 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 3, 'Abril', 37, 322, '+322 pips', 'Finalizado', array['AUD/CHF', 'WTI', 'USD/CHF', 'GBP/USD', 'USD/JPY', 'GBP/CHF', 'XAU/USD', 'CHF/JPY']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Abril/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('AUD/CHF', 'Venda', 'closed', 3, '+3 pips', 'Abril/2023', '2023-03-31', 'Finalizado', 1, true, 'take', 'elite', 1, 0.61214, 0.605, 0.6152),
  ('WTI', 'Compra', 'closed', 10, '+10 pips', 'Abril/2023', '2023-04-03', 'Finalizado', 2, true, 'take', 'elite', 2, 0.80353, 0.81, 0.796),
  ('USD/CHF', 'Venda', 'closed', 80, '+80 pips', 'Abril/2023', '2023-04-03', 'Finalizado', 3, true, 'take', 'elite', 3, 0.91352, 0.88414, 0.923),
  ('GBP/USD', 'Compra', 'closed', 80, '+80 pips', 'Abril/2023', '2023-04-03', 'Finalizado', 4, true, 'take', 'elite', 4, 1.24132, 1.263, 1.22442),
  ('USD/JPY', 'Venda', 'closed', 30, '+30 pips', 'Abril/2023', '2023-04-04', 'Finalizado', 5, true, 'take', 'elite', 5, 131.995, 128.5, 132.6),
  ('GBP/CHF', 'Compra', 'closed', -13, '-13 pips', 'Abril/2023', '2023-04-05', 'Finalizado', 6, true, 'stop', 'elite', 6, 1.1318, 1.1337, 1.1305),
  ('WTI', 'Venda', 'closed', -10, '-10 pips', 'Abril/2023', '2023-04-05', 'Finalizado', 7, true, 'stop', 'elite', 7, 0.80269, 0.781, 0.812),
  ('XAU/USD', 'Compra', 'closed', -46, '-46 pips', 'Abril/2023', '2023-04-05', 'Finalizado', 8, true, 'stop', 'elite', 8, 2022.64, 2030, 2018),
  ('CHF/JPY', 'Compra', 'closed', 189, '+189 pips', 'Abril/2023', '2023-04-06', 'Finalizado', 9, true, 'take', 'elite', 9, 145.27, 148.3, 143.4),
  ('USD/CHF', 'Venda', 'closed', -31, '-31 pips', 'Abril/2023', '2023-04-06', 'Finalizado', 10, true, 'stop', 'elite', 10, 0.90238, 0.898, 0.9055),
  ('CAD/JPY', 'Compra', 'closed', 36, '+36 pips', 'Abril/2023', '2023-04-07', 'Finalizado', 11, true, 'take', 'elite', 11, 97.742, 98.1, 97.3),
  ('EUR/NZD', 'Compra', 'closed', 110, '+110 pips', 'Abril/2023', '2023-04-10', 'Finalizado', 12, true, 'take', 'elite', 12, 1.7487, 1.783, 1.729),
  ('EUR/USD', 'Compra', 'closed', 76, '+76 pips', 'Abril/2023', '2023-04-11', 'Finalizado', 13, true, 'take', 'elite', 13, 1.0919, 1.0995, 1.086),
  ('GBP/USD', 'Compra', 'closed', 50, '+50 pips', 'Abril/2023', '2023-04-11', 'Finalizado', 14, true, 'take', 'elite', 14, 1.2439, 1.26, 1.236),
  ('GBP/CHF', 'Venda', 'closed', 20, '+20 pips', 'Abril/2023', '2023-04-11', 'Finalizado', 15, true, 'take', 'elite', 15, 1.125, 1.1205, 1.12711),
  ('EUR/GBP', 'Compra', 'closed', 30, '+30 pips', 'Abril/2023', '2023-04-13', 'Finalizado', 16, true, 'take', 'elite', 16, 0.88263, 0.8915, 0.879),
  ('NZD/JPY', 'Compra', 'closed', 33, '+33 pips', 'Abril/2023', '2023-04-13', 'Finalizado', 17, true, 'take', 'elite', 17, 83.224, 83.55, 82.85),
  ('AUD/CHF', 'Compra', 'closed', -28, '-28 pips', 'Abril/2023', '2023-04-13', 'Finalizado', 18, true, 'stop', 'elite', 18, 0.60333, 0.6055, 0.6005),
  ('GBP/USD', 'Compra', 'closed', -25, '-25 pips', 'Abril/2023', '2023-04-14', 'Finalizado', 19, true, 'stop', 'elite', 19, 1.2415, 1.244, 1.239),
  ('USD/JPY', 'Compra', 'closed', -85, '-85 pips', 'Abril/2023', '2023-04-17', 'Finalizado', 20, true, 'stop', 'elite', 20, 134.253, 136.45, 133.4),
  ('EUR/GBP', 'Compra', 'closed', -42, '-42 pips', 'Abril/2023', '2023-04-17', 'Finalizado', 21, true, 'stop', 'elite', 21, 0.88335, 0.8915, 0.87917),
  ('GBP/AUD', 'Venda', 'closed', -43, '-43 pips', 'Abril/2023', '2023-04-18', 'Finalizado', 22, true, 'stop', 'elite', 22, 1.84413, 1.839, 1.8484),
  ('GBP/CHF', 'Venda', 'closed', 18, '+18 pips', 'Abril/2023', '2023-04-19', 'Finalizado', 23, true, 'take', 'elite', 23, 1.11513, 1.11338, 1.1175),
  ('EUR/CHF', 'Venda', 'closed', -36, '-36 pips', 'Abril/2023', '2023-04-20', 'Finalizado', 24, true, 'stop', 'elite', 24, 0.98037, 0.9758, 0.984),
  ('EUR/USD', 'Compra', 'closed', -30, '-30 pips', 'Abril/2023', '2023-04-20', 'Finalizado', 25, true, 'stop', 'elite', 25, 1.097, 1.0998, 1.094),
  ('EUR/USD', 'Compra', 'closed', 55, '+55 pips', 'Abril/2023', '2023-04-21', 'Finalizado', 26, true, 'take', 'elite', 26, 1.0985, 1.104, 1.094),
  ('GBP/USD', 'Compra', 'closed', -77, '-77 pips', 'Abril/2023', '2023-04-24', 'Finalizado', 27, true, 'stop', 'elite', 27, 1.24971, 1.26, 1.242),
  ('CAD/JPY', 'Compra', 'closed', -30, '-30 pips', 'Abril/2023', '2023-04-24', 'Finalizado', 28, true, 'stop', 'elite', 28, 99.3, 99.5, 99),
  ('XAU/USD', 'Venda', 'closed', 45, '+45 pips', 'Abril/2023', '2023-04-25', 'Finalizado', 29, true, 'take', 'elite', 29, 1997.17, 1992.67, 2003.84),
  ('EUR/GBP', 'Compra', 'closed', -60, '-60 pips', 'Abril/2023', '2023-04-26', 'Finalizado', 30, true, 'stop', 'elite', 30, 0.886, 0.894, 0.88),
  ('XAU/USD', 'Compra', 'closed', 106, '+106 pips', 'Abril/2023', '2023-04-24', 'Finalizado', 31, true, 'take', 'elite', 31, 1997.41, 2008, 1996),
  ('NZD/JPY', 'Venda', 'closed', -59, '-59 pips', 'Abril/2023', '2023-04-26', 'Finalizado', 32, true, 'stop', 'elite', 32, 81.63, 81.09, 82.22),
  ('USD/CAD', 'Compra', 'closed', -38, '-38 pips', 'Abril/2023', '2023-04-26', 'Finalizado', 33, true, 'stop', 'elite', 33, 1.36376, 1.3745, 1.36),
  ('XAU/USD', 'Venda', 'closed', 60, '+60 pips', 'Abril/2023', '2023-04-26', 'Finalizado', 34, true, 'take', 'elite', 34, 1989.8, 1978.5, 1997.5),
  ('USD/JPY', 'Venda', 'closed', -72, '-72 pips', 'Abril/2023', '2023-04-27', 'Finalizado', 35, true, 'stop', 'elite', 35, 133.333, 132.65, 134.05),
  ('XAU/USD', 'Venda', 'closed', -34, '-34 pips', 'Abril/2023', '2023-04-28', 'Finalizado', 36, true, 'stop', 'elite', 36, 1982.77, 1972.9, 1986.13),
  ('XAU/USD', 'Venda', 'closed', 50, '+50 pips', 'Abril/2023', '2023-04-30', 'Finalizado', 37, true, 'take', 'elite', 37, 1988.18, 1974.28, 1993.5);
