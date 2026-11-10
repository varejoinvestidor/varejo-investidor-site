-- Backfill país / macro-região em eventos antigos (antes da migration de regiões)

update public.site_analytics_events e
set country_code = coalesce(
  e.country_code,
  (
    case lower(split_part(coalesce(nullif(trim(e.locale), ''), 'pt'), '-', 1))
      when 'pt' then 'BR'
      when 'en' then 'US'
      when 'es' then 'ES'
      when 'fr' then 'FR'
      when 'de' then 'DE'
      when 'it' then 'IT'
      when 'ar' then 'SA'
      when 'fa' then 'IR'
      when 'hi' then 'IN'
      when 'ur' then 'PK'
      when 'bn' then 'BD'
      when 'tr' then 'TR'
      when 'ru' then 'RU'
      when 'id' then 'ID'
      when 'vi' then 'VN'
      when 'th' then 'TH'
      when 'tl' then 'PH'
      when 'fil' then 'PH'
      when 'zh' then 'CN'
      when 'ja' then 'JP'
      when 'ko' then 'KR'
      when 'pl' then 'PL'
      when 'he' then 'IL'
      else null
    end
  )::char(2)
)
where e.country_code is null;

update public.site_analytics_events e
set
  region_id = coalesce(e.region_id, case
    when e.country_code = 'BR' then 'brazil'
    when e.country_code in ('US', 'CA') then 'northAmerica'
    when e.country_code in ('MX','AR','CL','CO','PE','UY','PY','BO','EC','VE','CR','PA','GT') then 'latinAmerica'
    when e.country_code in (
      'PT','ES','FR','DE','IT','GB','IE','CH','NL','BE','AT','PL','SE','NO','DK','FI','GR','CZ','HU','RO','UA','RU'
    ) then 'europe'
    when e.country_code in ('AE','SA','IL','TR','QA','KW','OM','BH','JO','IR','IQ') then 'middleEast'
    when e.country_code in ('IN','CN','JP','KR','SG','ID','TH','VN','PH','MY','TW','HK','PK','BD') then 'asia'
    when e.country_code in ('AU','NZ') then 'oceania'
    when e.country_code in ('ZA','NG','EG','MA','KE','GH') then 'africa'
    else 'other'
  end),
  region_label = coalesce(e.region_label, case
    when e.country_code = 'BR' then 'Brasil'
    when e.country_code in ('US', 'CA') then 'América do Norte'
    when e.country_code in ('MX','AR','CL','CO','PE','UY','PY','BO','EC','VE','CR','PA','GT') then 'América Latina'
    when e.country_code in (
      'PT','ES','FR','DE','IT','GB','IE','CH','NL','BE','AT','PL','SE','NO','DK','FI','GR','CZ','HU','RO','UA','RU'
    ) then 'Europa'
    when e.country_code in ('AE','SA','IL','TR','QA','KW','OM','BH','JO','IR','IQ') then 'Oriente Médio'
    when e.country_code in ('IN','CN','JP','KR','SG','ID','TH','VN','PH','MY','TW','HK','PK','BD') then 'Ásia'
    when e.country_code in ('AU','NZ') then 'Oceania'
    when e.country_code in ('ZA','NG','EG','MA','KE','GH') then 'África'
    else 'Indefinido'
  end)
where e.region_id is null or e.region_id = '';

notify pgrst, 'reload schema';
