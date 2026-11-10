-- Elite: Agosto/2022 (36 sinais, +162 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2022, 7, 'Agosto', 36, 162, '+162 pips', 'Finalizado', array['EUR/USD', 'GBP/JPY', 'GBP/NZD', 'GBP/CHF', 'CAD/JPY', 'CAD/CHF', 'EUR/CAD', 'NZD/CAD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Agosto/2022';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/USD', 'Compra', 'closed', -67, '-67 pips', 'Agosto/2022', '2022-08-01', 'Finalizado', 1, true, 'stop', 'elite', 1, 1.02664, 1.0355, 1.01996),
  ('GBP/JPY', 'Venda', 'closed', 19, '+19 pips', 'Agosto/2022', '2022-08-01', 'Finalizado', 2, true, 'take', 'elite', 2, 161.572, 161.228, 161.896),
  ('GBP/NZD', 'Compra', 'closed', 50, '+50 pips', 'Agosto/2022', '2022-08-01', 'Finalizado', 3, true, 'take', 'elite', 3, null, null, null),
  ('GBP/CHF', 'Compra', 'closed', 23, '+23 pips', 'Agosto/2022', '2022-08-02', 'Finalizado', 4, true, 'take', 'elite', 4, 1.16608, 1.16837, null),
  ('CAD/JPY', 'Venda', 'closed', -53, '-53 pips', 'Agosto/2022', '2022-08-03', 'Finalizado', 5, true, 'stop', 'elite', 5, 104.081, 103.57, 104.615),
  ('CAD/CHF', 'Venda', 'closed', 29, '+29 pips', 'Agosto/2022', '2022-08-04', 'Finalizado', 6, true, 'take', 'elite', 6, 0.74319, 0.7097, 0.7527),
  ('EUR/CAD', 'Compra', 'closed', -38, '-38 pips', 'Agosto/2022', '2022-08-04', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.31788, 1.32333, 1.31406),
  ('NZD/CAD', 'Compra', 'closed', -18, '-18 pips', 'Agosto/2022', '2022-08-05', 'Finalizado', 8, true, 'stop', 'elite', 8, 0.80793, null, 0.80611),
  ('CHF/JPY', 'Compra', 'closed', 72, '+72 pips', 'Agosto/2022', '2022-08-07', 'Finalizado', 9, true, 'take', 'elite', 9, 140.549, 141.708, 139.609),
  ('NZD/CAD', 'Compra', 'closed', 40, '+40 pips', 'Agosto/2022', '2022-08-08', 'Finalizado', 10, true, 'take', 'elite', 10, 0.80984, 0.81997, 0.80501),
  ('EUR/NZD', 'Venda', 'closed', -50, '-50 pips', 'Agosto/2022', '2022-08-08', 'Finalizado', 11, true, 'stop', 'elite', 11, 1.61998, 1.60183, 1.63348),
  ('USD/JPY', 'Compra', 'closed', -40, '-40 pips', 'Agosto/2022', '2022-08-09', 'Finalizado', 12, true, 'stop', 'elite', 12, 135.154, 135.725, 134.759),
  ('USD/CAD', 'Compra', 'closed', -28, '-28 pips', 'Agosto/2022', '2022-08-09', 'Finalizado', 13, true, 'stop', 'elite', 13, 1.28868, 1.29298, 1.28591),
  ('EUR/AUD', 'Compra', 'closed', -57, '-57 pips', 'Agosto/2022', '2022-08-09', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.46847, 1.47382, 1.46279),
  ('NZD/CAD', 'Compra', 'closed', 40, '+40 pips', 'Agosto/2022', '2022-08-09', 'Finalizado', 15, true, 'take', 'elite', 15, null, null, null),
  ('AUD/JPY', 'Compra', 'closed', -47, '-47 pips', 'Agosto/2022', '2022-08-10', 'Finalizado', 16, true, 'stop', 'elite', 16, 93.873, 93.258, 94.343),
  ('XAU/USD', 'Compra', 'closed', -75, '-75 pips', 'Agosto/2022', '2022-08-10', 'Finalizado', 17, true, 'stop', 'elite', 17, 1800.25, 1809.94, 1792.71),
  ('AUD/CHF', 'Compra', 'closed', 20, '+20 pips', 'Agosto/2022', '2022-08-11', 'Finalizado', 18, true, 'take', 'elite', 18, 0.66879, 0.67272, 0.66438),
  ('GBP/JPY', 'Venda', 'closed', 100, '+100 pips', 'Agosto/2022', '2022-08-12', 'Finalizado', 19, true, 'take', 'elite', 19, 161.984, 160.157, 163.148),
  ('EUR/CAD', 'Compra', 'closed', -87, '-87 pips', 'Agosto/2022', '2022-08-15', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.31874, 1.32638, 1.31008),
  ('EUR/USD', 'Compra', 'closed', -29, '-29 pips', 'Agosto/2022', '2022-08-15', 'Finalizado', 21, true, 'stop', 'elite', 21, 1.01663, 1.01918, 1.01373),
  ('XAU/USD', 'Venda', 'closed', -46, '-46 pips', 'Agosto/2022', '2022-08-16', 'Finalizado', 22, true, 'stop', 'elite', 22, 1774.64, 1769.26, 1779.2),
  ('CHF/JPY', 'Compra', 'closed', 60, '+60 pips', 'Agosto/2022', '2022-08-16', 'Finalizado', 23, true, 'take', 'elite', 23, 141.558, 142.392, 140.858),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Agosto/2022', '2022-08-16', 'Finalizado', 24, true, 'take', 'elite', 24, null, null, null),
  ('CAD/JPY', 'Venda', 'closed', -40, '-40 pips', 'Agosto/2022', '2022-08-17', 'Finalizado', 25, true, 'stop', 'elite', 25, 104.373, 104.026, 104.775),
  ('XAU/USD', 'Venda', 'closed', 68, '+68 pips', 'Agosto/2022', '2022-08-18', 'Finalizado', 26, true, 'take', 'elite', 26, 1754.26, 1747.46, 1760.75),
  ('GBP/JPY', 'Venda', 'closed', 26, '+26 pips', 'Agosto/2022', '2022-08-19', 'Finalizado', 27, true, 'take', 'elite', 27, 162.063, 161.118, 162.649),
  ('WTI', 'Compra', 'closed', 130, '+130 pips', 'Agosto/2022', '2022-08-22', 'Finalizado', 28, true, 'take', 'elite', 28, 0.90589, 0.92838, 0.89417),
  ('XAU/USD', 'Compra', 'closed', 60, '+60 pips', 'Agosto/2022', '2022-08-23', 'Finalizado', 29, true, 'take', 'elite', 29, 1738.88, 1748.43, 1732.91),
  ('CAD/JPY', 'Compra', 'closed', 29, '+29 pips', 'Agosto/2022', '2022-08-24', 'Finalizado', 30, true, 'take', 'elite', 30, 105.443, 105.728, 105.225),
  ('EUR/JPY', 'Venda', 'closed', -67, '-67 pips', 'Agosto/2022', '2022-08-25', 'Finalizado', 31, true, 'stop', 'elite', 31, 136.065, 135.253, 136.732),
  ('NZD/CAD', 'Venda', 'closed', 30, '+30 pips', 'Agosto/2022', '2022-08-26', 'Finalizado', 32, true, 'take', 'elite', 32, 0.80256, 0.79494, 0.80523),
  ('GBP/NZD', 'Venda', 'closed', 79, '+79 pips', 'Agosto/2022', '2022-08-29', 'Finalizado', 33, true, 'take', 'elite', 33, 1.90396, 1.89602, 1.91301),
  ('AUD/CHF', 'Compra', 'closed', 2, '+2 pips', 'Agosto/2022', '2022-08-29', 'Finalizado', 34, true, 'take', 'elite', 34, 0.66951, 0.67871, 0.66121),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Agosto/2022', '2022-08-30', 'Finalizado', 35, true, 'take', 'elite', 35, 1731.25, 1722.56, 1735.77),
  ('EUR/USD', 'Compra', 'closed', -53, '-53 pips', 'Agosto/2022', '2022-08-30', 'Finalizado', 36, true, 'stop', 'elite', 36, 1.00284, 1.0082, 0.99752);
