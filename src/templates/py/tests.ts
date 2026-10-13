import type { Answers } from '../../answers/types.ts';
import { lines } from '../helpers.ts';

export function pyTestHome(a: Answers): string {
  return lines(
    'import re',
    '',
    'import pytest',
    'from playwright.sync_api import Page, expect',
    '',
    a.data && 'from data.factories import User',
    'from pages.home_page import HomePage',
    '',
    '',
    '@pytest.mark.smoke',
    'def test_carga_la_pagina_principal(page: Page, home_page: HomePage) -> None:',
    '    home_page.goto()',
    '',
    '    expect(page).to_have_title(re.compile(r".+"))',
    '    expect(home_page.main_heading.first).to_be_visible()',
    a.size !== 'small' && [
      '',
      '',
      '@pytest.mark.regression',
      'def test_muestra_la_navegacion_principal(home_page: HomePage) -> None:',
      '    home_page.goto()',
      '',
      '    expect(home_page.header.links.first).to_be_visible()',
    ],
    a.data && [
      '',
      '',
      '@pytest.mark.regression',
      'def test_ejemplo_datos_sinteticos(user: User) -> None:',
      '    # El usuario se genera con la factory: nunca datos reales',
      '    assert re.fullmatch(r"qa\\+.+@example\\.com", user.email)',
    ],
    '',
  );
}

export function pyTestApi(): string {
  return lines(
    'import pytest',
    '',
    'from api.client import ApiClient',
    'from config.env import settings',
    '',
    'pytestmark = [',
    '    pytest.mark.api,',
    '    pytest.mark.skipif(not settings.api_url, reason="Define API_URL en .env para las pruebas de API"),',
    ']',
    '',
    '',
    '@pytest.mark.smoke',
    'def test_health_responde_200(api: ApiClient) -> None:',
    '    response = api.get("/health")',
    '',
    '    assert response.status == 200',
    '',
  );
}

export function pyTestDb(a: Answers): string {
  const body =
    a.db === 'mongodb'
      ? ['    assert db.ping()["ok"] == 1']
      : ['    rows = db.query("SELECT 1")', '', '    assert rows[0][0] == 1'];
  return lines(
    'import pytest',
    '',
    'from config.env import settings',
    'from db.client import Db',
    '',
    'pytestmark = [',
    '    pytest.mark.db,',
    '    pytest.mark.skipif(not settings.db_url, reason="Define DB_URL en .env para las pruebas de BD"),',
    ']',
    '',
    '',
    'def test_la_conexion_responde(db: Db) -> None:',
    body,
    '',
  );
}

export function pyTestA11y(): string {
  return lines(
    'import pytest',
    'from axe_playwright_python.sync_playwright import Axe',
    'from playwright.sync_api import Page',
    '',
    'from pages.home_page import HomePage',
    '',
    '',
    '@pytest.mark.a11y',
    'def test_home_sin_violaciones_criticas(page: Page, home_page: HomePage) -> None:',
    '    home_page.goto()',
    '    results = Axe().run(page)',
    '',
    '    critical = [v for v in results.response["violations"] if v.get("impact") == "critical"]',
    '    assert critical == [], results.generate_report()',
    '',
  );
}
