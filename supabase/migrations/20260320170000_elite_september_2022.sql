-- Relatório Elite: setembro/2022 (37 sinais, +596 pips consolidados)

insert into public.elite_monthly_reports (
  year,
  month_index,
  month_label,
  signals,
  pips,
  result_label,
  status_label,
  assets
)
values (
  2022,
  8,
  'Setembro',
  37,
  596,
  '+596 pips',
  'Finalizado',
  array['XAU/USD', 'USOIL', 'GBP/USD', 'EUR/USD', 'GBP/JPY']::text[]
)
on conflict (year, month_index) do update
set
  month_label = excluded.month_label,
  signals = excluded.signals,
  pips = excluded.pips,
  result_label = excluded.result_label,
  status_label = excluded.status_label,
  assets = excluded.assets,
  updated_at = now();

delete from public.elite_operations
where report_month = 'Setembro/2022';

insert into public.elite_operations (
  asset,
  direction,
  status,
  result_pips,
  result_label,
  report_month,
  traded_on,
  updated_label,
  sort_order,
  show_public,
  close_outcome,
  signal_tier,
  entry_price,
  take_price,
  stop_price
)
values
  ('EUR/JPY', 'Venda', 'closed', -10, '-10 pips', 'Setembro/2022', '2022-09-01', 'Finalizado', 1, true, 'stop', 'elite', 139.412, 138.336, 140.187),
  ('GBP/USD', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 2, true, 'stop', 'elite', 1.1512, 1.1542, 1.1482),
  ('XAU/USD', 'Compra', 'closed', 62, '+62 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 3, true, 'take', 'elite', 1707.55, 1713.74, 1703.45),
  ('GBP/USD', 'Compra', 'closed', 20, '+20 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 4, true, 'take', 'elite', 1.1497, 1.1517, 1.1477),
  ('USOIL', 'Compra', 'closed', 153, '+153 pips', 'Setembro/2022', '2022-09-04', 'Finalizado', 5, true, 'take', 'elite', 87.946, 90.187, 86.936),
  ('XAU/USD', 'Compra', 'closed', 52, '+52 pips', 'Setembro/2022', '2022-09-05', 'Finalizado', 6, true, 'take', 'elite', 1714.77, 1719.96, 1709.47),
  ('EUR/CAD', 'Venda', 'closed', -96, '-96 pips', 'Setembro/2022', '2022-09-06', 'Finalizado', 7, true, 'stop', 'elite', 1.30157, 1.30815, 1.29202),
  ('USOIL', 'Venda', 'closed', 70, '+70 pips', 'Setembro/2022', '2022-09-06', 'Finalizado', 8, true, 'take', 'elite', 85.835, 83.043, 86.898),
  ('EUR/CHF', 'Compra', 'closed', -44, '-44 pips', 'Setembro/2022', '2022-09-07', 'Finalizado', 9, true, 'stop', 'elite', 0.97553, 0.97943, 0.97109),
  ('GBP/USD', 'Compra', 'closed', 33, '+33 pips', 'Setembro/2022', '2022-09-08', 'Finalizado', 10, true, 'take', 'elite', 1.15129, 1.15463, 1.14699),
  ('XAU/USD', 'Compra', 'closed', 23, '+23 pips', 'Setembro/2022', '2022-09-08', 'Finalizado', 11, true, 'take', 'elite', 1710.007, 1712.238, 1707.714),
  ('USOIL', 'Venda', 'closed', 27, '+27 pips', 'Setembro/2022', '2022-09-09', 'Finalizado', 12, true, 'take', 'elite', 85.222, 84.948, 85.724),
  ('GBP/NZD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2022', '2022-09-12', 'Finalizado', 13, true, 'take', 'elite', 1.90258, 1.90612, 1.8994),
  ('CHF/JPY', 'Venda', 'closed', -65, '-65 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 14, true, 'stop', 'elite', 149.317, 148.39, 149.962),
  ('USOIL', 'Venda', 'closed', 92, '+92 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 15, true, 'take', 'elite', 86.769, 85.845, 87.413),
  ('GBP/AUD', 'Compra', 'closed', 72, '+72 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 16, true, 'take', 'elite', 1.70119, 1.7084, 1.6976),
  ('EUR/USD', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 17, true, 'take', 'elite', 0.99812, 1.00235, 0.99369),
  ('XAU/USD', 'Compra', 'closed', -32, '-32 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 18, true, 'stop', 'elite', 1705.05, 1709.26, 1701.87),
  ('EUR/CAD', 'Compra', 'closed', 34, '+34 pips', 'Setembro/2022', '2022-09-15', 'Finalizado', 19, true, 'take', 'elite', 1.31928, 1.32271, 1.3148),
  ('EUR/USD', 'Compra', 'closed', -18, '-18 pips', 'Setembro/2022', '2022-09-15', 'Finalizado', 20, true, 'stop', 'elite', 1.0008, 1.00269, 0.99899),
  ('XAU/USD', 'Venda', 'closed', 41, '+41 pips', 'Setembro/2022', '2022-09-16', 'Finalizado', 21, true, 'take', 'elite', 1677.04, 1672.92, 1679.48),
  ('CAD/JPY', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 22, true, 'take', 'elite', 107.92, 108.411, 107.616),
  ('AUD/CAD', 'Venda', 'closed', -37, '-37 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 23, true, 'stop', 'elite', 0.88999, 0.88504, 0.8922),
  ('XAU/USD', 'Compra', 'closed', 34, '+34 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 24, true, 'take', 'elite', 1671.94, 1675.33, 1667.71),
  ('CAD/JPY', 'Venda', 'closed', -20, '-20 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 25, true, 'stop', 'elite', 108.18, 107.98, 108.38),
  ('XAU/USD', 'Venda', 'closed', -74, '-74 pips', 'Setembro/2022', '2022-09-20', 'Finalizado', 26, true, 'stop', 'elite', 1662.82, 1655.9, 1670.24),
  ('GBP/JPY', 'Venda', 'closed', 60, '+60 pips', 'Setembro/2022', '2022-09-21', 'Finalizado', 27, true, 'take', 'elite', 163.108, 162.508, 163.532),
  ('XAU/USD', 'Venda', 'closed', 67, '+67 pips', 'Setembro/2022', '2022-09-21', 'Finalizado', 28, true, 'take', 'elite', 1666.46, 1659.77, 1672.06),
  ('XAU/USD', 'Compra', 'closed', 54, '+54 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 29, true, 'take', 'elite', 1673.25, 1678.68, 1668.55),
  ('USD/CHF', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 30, true, 'take', 'elite', 0.97738, 0.98267, 0.97294),
  ('XAU/USD', 'Compra', 'closed', -47, '-47 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 31, true, 'stop', 'elite', 1673.3, 1677.86, 1668.63),
  ('XAU/USD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 32, true, 'take', 'elite', 1644.78, 1649.32, 1640.92),
  ('GBP/USD', 'Compra', 'closed', 9, '+9 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 33, true, 'take', 'elite', 1.09201, 1.09293, 1.0901),
  ('GBP/CHF', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 34, true, 'stop', 'elite', 1.1215, 1.1245, 1.1185),
  ('GBP/JPY', 'Compra', 'closed', 16, '+16 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 35, true, 'take', 'elite', 156.309, 156.47, 156.149),
  ('XAU/USD', 'Compra', 'closed', -20, '-20 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 36, true, 'stop', 'elite', 1647.52, 1649.32, 1645.51),
  ('GBP/USD', 'Venda', 'closed', 40, '+40 pips', 'Setembro/2022', '2022-09-26', 'Finalizado', 37, true, 'take', 'elite', 1.08774, 1.08374, 1.09174);
