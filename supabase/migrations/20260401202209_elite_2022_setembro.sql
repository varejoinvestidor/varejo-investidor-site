-- Elite: Setembro/2022 (43 sinais, +278 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2022, 8, 'Setembro', 43, 278, '+278 pips', 'Finalizado', array['EUR/JPY', 'GBP/USD', 'XAU/USD', 'WTI', 'EUR/CAD', 'EUR/CHF', 'GBP/NZD', 'CHF/JPY']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Setembro/2022';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/JPY', 'Venda', 'closed', -10, '-10 pips', 'Setembro/2022', '2022-09-01', 'Finalizado', 1, true, 'stop', 'elite', 1, 139.412, 138.336, 140.187),
  ('GBP/USD', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 2, true, 'stop', 'elite', 2, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 62, '+62 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 3, true, 'take', 'elite', 3, 1707.55, 1713.74, 1703.45),
  ('GBP/USD', 'Compra', 'closed', 20, '+20 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 4, true, 'take', 'elite', 4, null, null, null),
  ('WTI', 'Compra', 'closed', 153, '+153 pips', 'Setembro/2022', '2022-09-04', 'Finalizado', 5, true, 'take', 'elite', 5, 0.87946, 0.90187, 0.86936),
  ('XAU/USD', 'Compra', 'closed', 52, '+52 pips', 'Setembro/2022', '2022-09-05', 'Finalizado', 6, true, 'take', 'elite', 6, 1714.77, 1719.96, 1709.47),
  ('EUR/CAD', 'Venda', 'closed', -66, '-66 pips', 'Setembro/2022', '2022-09-06', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.30157, 1.29202, 1.30815),
  ('WTI', 'Venda', 'closed', 70, '+70 pips', 'Setembro/2022', '2022-09-06', 'Finalizado', 8, true, 'take', 'elite', 8, 0.85835, 0.83043, 0.86898),
  ('EUR/CHF', 'Compra', 'closed', -44, '-44 pips', 'Setembro/2022', '2022-09-07', 'Finalizado', 9, true, 'stop', 'elite', 9, 0.97553, 0.97943, 0.97109),
  ('GBP/USD', 'Compra', 'closed', 33, '+33 pips', 'Setembro/2022', '2022-09-08', 'Finalizado', 10, true, 'take', 'elite', 10, 1.15129, 1.15463, 1.14699),
  ('XAU/USD', 'Compra', 'closed', 23, '+23 pips', 'Setembro/2022', '2022-09-08', 'Finalizado', 11, true, 'take', 'elite', 11, 1710.07, 1712.38, 1707.14),
  ('WTI', 'Venda', 'closed', 27, '+27 pips', 'Setembro/2022', '2022-09-09', 'Finalizado', 12, true, 'take', 'elite', 12, 0.85222, 0.84948, 0.85724),
  ('GBP/NZD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2022', '2022-09-12', 'Finalizado', 13, true, 'take', 'elite', 13, 1.90258, 1.90612, 1.8994),
  ('CHF/JPY', 'Venda', 'closed', -65, '-65 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 14, true, 'stop', 'elite', 14, 149.317, 148.39, 149.962),
  ('WTI', 'Venda', 'closed', 92, '+92 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 15, true, 'take', 'elite', 15, 0.86769, 0.85845, 0.87413),
  ('GBP/AUD', 'Compra', 'closed', 72, '+72 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 16, true, 'take', 'elite', 16, 1.70119, 1.7084, 1.6976),
  ('EUR/USD', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 17, true, 'take', 'elite', 17, 0.99812, 1.00235, 0.99369),
  ('XAU/USD', 'Compra', 'closed', -32, '-32 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 18, true, 'stop', 'elite', 18, 1705.05, 1709.26, 1701.87),
  ('EUR/CAD', 'Compra', 'closed', 34, '+34 pips', 'Setembro/2022', '2022-09-15', 'Finalizado', 19, true, 'take', 'elite', 19, 1.31928, 1.32271, 1.3148),
  ('EUR/USD', 'Compra', 'closed', -18, '-18 pips', 'Setembro/2022', '2022-09-15', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.0008, 1.00269, 0.99899),
  ('XAU/USD', 'Venda', 'closed', 41, '+41 pips', 'Setembro/2022', '2022-09-16', 'Finalizado', 21, true, 'take', 'elite', 21, 1677.04, 1672.92, 1679.48),
  ('CAD/JPY', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 22, true, 'stop', 'elite', 22, 107.92, 108.411, 107.616),
  ('AUD/CAD', 'Venda', 'closed', -37, '-37 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 23, true, 'stop', 'elite', 23, 0.88898, 0.88504, 0.8927),
  ('XAU/USD', 'Compra', 'closed', 34, '+34 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 24, true, 'take', 'elite', 24, 1671.94, 1675.33, 1667.71),
  ('CAD/JPY', 'Venda', 'closed', -20, '-20 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 25, true, 'stop', 'elite', 25, null, null, null),
  ('XAU/USD', 'Venda', 'closed', -74, '-74 pips', 'Setembro/2022', '2022-09-20', 'Finalizado', 26, true, 'stop', 'elite', 26, 1662.82, 1655.9, 1670.24),
  ('GBP/JPY', 'Venda', 'closed', 60, '+60 pips', 'Setembro/2022', '2022-09-21', 'Finalizado', 27, true, 'take', 'elite', 27, 163.108, 162.508, 163.532),
  ('XAU/USD', 'Venda', 'closed', 67, '+67 pips', 'Setembro/2022', '2022-09-21', 'Finalizado', 28, true, 'take', 'elite', 28, 1666.46, 1659.77, 1672.06),
  ('XAU/USD', 'Compra', 'closed', 54, '+54 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 29, true, 'take', 'elite', 29, 1673.25, 1678.68, 1668.55),
  ('USD/CHF', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 30, true, 'take', 'elite', 30, 0.97738, 0.98262, 0.97194),
  ('XAU/USD', 'Compra', 'closed', -47, '-47 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 31, true, 'stop', 'elite', 31, 1673.3, 1677.86, 1668.63),
  ('XAU/USD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 32, true, 'take', 'elite', 32, 1644.78, 1649.32, 1640.92),
  ('GBP/USD', 'Compra', 'closed', 9, '+9 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 33, true, 'take', 'elite', 33, 1.09201, 1.09293, null),
  ('GBP/CHF', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 34, true, 'stop', 'elite', 34, null, null, null),
  ('GBP/JPY', 'Compra', 'closed', 16, '+16 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 35, true, 'take', 'elite', 35, 156.309, 156.47, null),
  ('XAU/USD', 'Compra', 'closed', -20, '-20 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 36, true, 'stop', 'elite', 36, 1647.52, 1649.32, 1645.51),
  ('GBP/USD', 'Venda', 'closed', 40, '+40 pips', 'Setembro/2022', '2022-09-26', 'Finalizado', 37, true, 'take', 'elite', 37, 1.08774, 1.08374, null),
  ('CAD/CHF', 'Compra', 'closed', -32, '-32 pips', 'Setembro/2022', '2022-09-26', 'Finalizado', 38, true, 'stop', 'elite', 38, 0.72364, 0.72765, 0.72049),
  ('GBP/CAD', 'Venda', 'closed', -46, '-46 pips', 'Setembro/2022', '2022-09-26', 'Finalizado', 39, true, 'stop', 'elite', 39, 1.47427, 1.47026, 1.47888),
  ('GBP/CAD', 'Venda', 'closed', -73, '-73 pips', 'Setembro/2022', '2022-09-27', 'Finalizado', 40, true, 'stop', 'elite', 40, 1.46806, 1.46224, 1.47509),
  ('WTI', 'Venda', 'closed', -73, '-73 pips', 'Setembro/2022', '2022-09-27', 'Finalizado', 41, true, 'stop', 'elite', 41, 0.77341, 0.76279, 0.78073),
  ('CHF/JPY', 'Compra', 'closed', -85, '-85 pips', 'Setembro/2022', '2022-09-29', 'Finalizado', 42, true, 'stop', 'elite', 42, 148.154, 148.973, 147.302),
  ('CAD/JPY', 'Venda', 'closed', 21, '+21 pips', 'Setembro/2022', '2022-09-30', 'Finalizado', 43, true, 'take', 'elite', 43, 105.072, 104.867, 105.392);
