-- Elite: Julho/2021 (28 sinais, +84 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 6, 'Julho', 28, 84, '+84 pips', 'Finalizado', array['XAU/USD', 'EUR/JPY', 'GBP/CHF', 'USD/CHF', 'WTI', 'EUR/GBP', 'EUR/USD', 'EUR/AUD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Julho/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('XAU/USD', 'Compra', 'closed', 70, '+70 pips', 'Julho/2021', '2021-07-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1776.28, 1785.5, 1768.47),
  ('EUR/JPY', 'Venda', 'closed', 96, '+96 pips', 'Julho/2021', '2021-07-02', 'Finalizado', 2, true, 'take', 'elite', 2, 131.715, 130.701, 132.24),
  ('GBP/CHF', 'Venda', 'closed', -62, '-62 pips', 'Julho/2021', '2021-07-02', 'Finalizado', 3, true, 'stop', 'elite', 3, 1.27248, 1.25447, 1.27869),
  ('USD/CHF', 'Venda', 'closed', -6, '-6 pips', 'Julho/2021', '2021-07-05', 'Finalizado', 4, true, 'stop', 'elite', 4, 0.92152, 0.91929, 0.92207),
  ('WTI', 'Compra', 'closed', 44, '+44 pips', 'Julho/2021', '2021-07-06', 'Finalizado', 5, true, 'take', 'elite', 5, 0.72962, 0.734, 0.72571),
  ('XAU/USD', 'Compra', 'closed', -37, '-37 pips', 'Julho/2021', '2021-07-07', 'Finalizado', 6, true, 'stop', 'elite', 6, 1804.85, 1810, 1801.17),
  ('EUR/GBP', 'Compra', 'closed', -30, '-30 pips', 'Julho/2021', '2021-07-08', 'Finalizado', 7, true, 'stop', 'elite', 7, 0.85964, 0.86357, 0.85665),
  ('EUR/USD', 'Compra', 'closed', -36, '-36 pips', 'Julho/2021', '2021-07-09', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.18773, 1.19345, 1.18409),
  ('WTI', 'Compra', 'closed', -77, '-77 pips', 'Julho/2021', '2021-07-12', 'Finalizado', 9, true, 'stop', 'elite', 9, 0.72858, 0.71414, 0.73625),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Julho/2021', '2021-07-12', 'Finalizado', 10, true, 'take', 'elite', 10, 1807.11, 1814, 1802),
  ('EUR/AUD', 'Compra', 'closed', -44, '-44 pips', 'Julho/2021', '2021-07-13', 'Finalizado', 11, true, 'stop', 'elite', 11, 1.5833, 1.58749, 1.57893),
  ('XAU/USD', 'Compra', 'closed', 69, '+69 pips', 'Julho/2021', '2021-07-13', 'Finalizado', 12, true, 'take', 'elite', 12, 1809.67, 1816.57, 1803.55),
  ('EUR/AUD', 'Compra', 'closed', 30, '+30 pips', 'Julho/2021', '2021-07-14', 'Finalizado', 13, true, 'take', 'elite', 13, 1.58327, 1.587, 1.578),
  ('GBP/NZD', 'Compra', 'closed', 35, '+35 pips', 'Julho/2021', '2021-07-14', 'Finalizado', 14, true, 'take', 'elite', 14, 1.9715, 1.975, 1.968),
  ('CHF/JPY', 'Compra', 'closed', 10, '+10 pips', 'Julho/2021', '2021-07-15', 'Finalizado', 15, true, 'take', 'elite', 15, 119.754, 119.978, 119.53),
  ('AUD/CAD', 'Compra', 'closed', -34, '-34 pips', 'Julho/2021', '2021-07-19', 'Finalizado', 16, true, 'stop', 'elite', 16, 0.93857, 0.9412, 0.9352),
  ('WTI', 'Compra', 'closed', 30, '+30 pips', 'Julho/2021', '2021-07-19', 'Finalizado', 17, true, 'take', 'elite', 17, 0.6703, 0.67326, 0.66568),
  ('AUD/USD', 'Compra', 'closed', 21, '+21 pips', 'Julho/2021', '2021-07-20', 'Finalizado', 18, true, 'take', 'elite', 18, 0.73315, 0.73524, 0.73145),
  ('CAD/JPY', 'Venda', 'closed', -38, '-38 pips', 'Julho/2021', '2021-07-21', 'Finalizado', 19, true, 'stop', 'elite', 19, 87.529, 87.192, 87.907),
  ('EUR/CAD', 'Compra', 'closed', -38, '-38 pips', 'Julho/2021', '2021-07-21', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.48354, 1.48711, 1.47978),
  ('AUD/CAD', 'Compra', 'closed', 20, '+20 pips', 'Julho/2021', '2021-07-22', 'Finalizado', 21, true, 'take', 'elite', 21, 0.92698, 0.93049, 0.92449),
  ('WTI', 'Venda', 'closed', -40, '-40 pips', 'Julho/2021', '2021-07-23', 'Finalizado', 22, true, 'stop', 'elite', 22, 0.7128, 0.70775, 0.71684),
  ('EUR/JPY', 'Compra', 'closed', -49, '-49 pips', 'Julho/2021', '2021-07-26', 'Finalizado', 23, true, 'stop', 'elite', 23, 130.134, 130.821, 129.648),
  ('AUD/CAD', 'Compra', 'closed', -19, '-19 pips', 'Julho/2021', '2021-07-27', 'Finalizado', 24, true, 'stop', 'elite', 24, 0.92628, 0.9315, 0.92439),
  ('USD/CHF', 'Compra', 'closed', -9, '-9 pips', 'Julho/2021', '2021-07-28', 'Finalizado', 25, true, 'stop', 'elite', 25, 0.90971, 0.91078, 0.90879),
  ('GBP/USD', 'Venda', 'closed', 46, '+46 pips', 'Julho/2021', '2021-07-29', 'Finalizado', 26, true, 'take', 'elite', 26, 1.39486, 1.39023, 1.39921),
  ('XAU/USD', 'Venda', 'closed', 83, '+83 pips', 'Julho/2021', '2021-07-29', 'Finalizado', 27, true, 'take', 'elite', 27, 1829, 1820.69, 1833.26),
  ('AUD/USD', 'Venda', 'closed', 9, '+9 pips', 'Julho/2021', '2021-07-30', 'Finalizado', 28, true, 'take', 'elite', 28, 0.73483, 0.73022, 0.7372);
