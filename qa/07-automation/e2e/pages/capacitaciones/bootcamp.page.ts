import type { Locator } from '@playwright/test';
import { BootcampText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

// Bootcamp landing. The self-assessment is 100 % client-side, but its button
// fires a Google Ads 'purchase' conversion: trackers are aborted by the
// network fixture in every test (HC-21).
export class BootcampPage extends BasePage {
  get heroHeading(): Locator {
    return this.page.getByRole('heading', { level: 1, name: BootcampText.HeroFragment });
  }

  get evaluateCta(): Locator {
    return this.page.getByRole('link', { name: BootcampText.EvaluateCta, exact: true });
  }

  get routeCta(): Locator {
    return this.page.getByRole('link', { name: BootcampText.RouteCta, exact: true });
  }

  get submitQuizButton(): Locator {
    return this.page.getByRole('button', { name: BootcampText.SubmitQuiz, exact: true });
  }

  get result(): Locator {
    return this.page.getByText(BootcampText.ResultPrefix);
  }

  get howToApplyLink(): Locator {
    return this.page.getByRole('link', { name: BootcampText.HowToApply, exact: true });
  }

  get whatsappCta(): Locator {
    return this.page.getByRole('link', { name: BootcampText.WhatsAppCta, exact: true });
  }

  get whatsappChatLink(): Locator {
    return this.page.getByRole('link', { name: BootcampText.WhatsAppChat, exact: true });
  }

  get emailCta(): Locator {
    return this.page.getByRole('link', { name: BootcampText.EmailCta, exact: true });
  }

  /**
   * FAQ item (details element, role group) by its question.
   * @param question - question text
   * @returns the group locator
   */
  faqItem(question: string): Locator {
    return this.page.getByRole('group').filter({ hasText: question });
  }

  /**
   * Opens the Bootcamp landing.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.Bootcamp);
  }

  /**
   * Answers the self-assessment: one option per question, picked by its score.
   * @param questions - question group names with their options ordered by score 0..2
   * @param scores - one score (0..2) per question
   */
  async answerQuiz(
    questions: ReadonlyArray<{ group: string; options: readonly string[] }>,
    scores: readonly number[],
  ): Promise<void> {
    for (const [i, question] of questions.entries()) {
      const option = question.options[scores[i]];
      await this.page.getByRole('group', { name: question.group }).getByRole('radio', { name: option }).check();
    }
  }

  /**
   * Clicks "Ver mi orientación" (client-side only; trackers are aborted).
   */
  async submitQuiz(): Promise<void> {
    await this.submitQuizButton.click();
  }

  /**
   * Opens one FAQ item by clicking its question.
   * @param question - question text
   */
  async openFaq(question: string): Promise<void> {
    await this.page.getByText(question, { exact: true }).click();
  }

  /**
   * Number of FAQ items (details elements of the page).
   * @returns the count
   */
  async faqCount(): Promise<number> {
    return this.page.evaluate(() => document.querySelectorAll('details').length);
  }

  /**
   * Whether a FAQ item is open and its answer is rendered.
   * @param question - question text
   * @returns open flag and the visible answer length
   */
  async faqState(question: string): Promise<{ open: boolean; answerLength: number }> {
    return this.page.evaluate((q) => {
      const item = [...document.querySelectorAll('details')].find((d) =>
        (d.querySelector('summary')?.textContent ?? '').includes(q),
      );
      if (!item) return { open: false, answerLength: 0 };
      const answer = [...item.children].filter((c) => c.tagName !== 'SUMMARY');
      const visible = answer.filter((c) => (c as HTMLElement).offsetHeight > 0);
      return { open: item.open, answerLength: visible.map((c) => c.textContent ?? '').join('').trim().length };
    }, question);
  }
}
