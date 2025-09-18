import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  it('Should display tip total and bill total to be $0.00, reset button disabled, when all input is empty and tip button is not selected', () => {
    const billInput = screen.getByLabelText(/Bill/i);
    const tipButtons = screen.getAllByRole('button', { name: /%/i });
    const customTipInput = screen.getByPlaceholderText(/Custom/i);
    const peopleInput = screen.getByLabelText(/Number of People/i);
    const resultsText = screen.getAllByText('$0.00');
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    expect(billInput).toHaveValue('');
    tipButtons.forEach((button) => {
      expect(button).not.toHaveClass('bg-Grey-400 text-Green-900');
    });
    expect(customTipInput).toHaveValue('');
    expect(peopleInput).toHaveValue('');
    resultsText.forEach((result) => {
      expect(result).toBeInTheDocument();
    });
    expect(resetButton).toBeDisabled();
  });

  it('Should display correct tip total and bill total, reset button enable, when bill and people input is filled, also tip button is selected', async () => {
    const billInput = screen.getByLabelText(/Bill/i);
    const tip15Button = screen.getByRole('button', { name: '15%' });
    const peopleInput = screen.getByLabelText(/Number of People/i);
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    await user.type(billInput, '142.55');
    await user.click(tip15Button);
    await user.type(peopleInput, '5');

    expect(tip15Button).toHaveClass('bg-Grey-400 text-Green-900');
    expect(screen.getByText('$4.28')).toBeInTheDocument();
    expect(screen.getByText('$32.79')).toBeInTheDocument();

    expect(resetButton).toBeEnabled();
  });

  it('Should display correct tip total and bill total, reset button enable, when bill, people and custom tip input is filled', async () => {
    const billInput = screen.getByLabelText(/Bill/i);
    const customTipInput = screen.getByPlaceholderText(/Custom/i);
    const peopleInput = screen.getByLabelText(/Number of People/i);
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    await user.type(billInput, '142.55');
    await user.type(customTipInput, '20');
    await user.type(peopleInput, '5');

    expect(screen.getByText('$5.70')).toBeInTheDocument();
    expect(screen.getByText('$34.21')).toBeInTheDocument();

    expect(resetButton).toBeEnabled();
  });

  it("Should display alert Can't be zero when bill or people input is filled by 0", async () => {
    const billInput = screen.getByLabelText(/Bill/i);
    const customTipInput = screen.getByPlaceholderText(/Custom/i);
    const peopleInput = screen.getByLabelText(/Number of People/i);

    await user.type(billInput, '0');
    await user.type(customTipInput, '20');
    await user.type(peopleInput, '5');

    const alerts = screen.getAllByRole('alert');
    alerts.forEach((alert) => {
      expect(alert).toHaveTextContent(/Can't be zero/i);
    });
  });

  it('Should return to initial display when reset button is clicked', async () => {
    const billInput = screen.getByLabelText(/Bill/i);
    const tip15Button = screen.getByRole('button', { name: '15%' });
    const peopleInput = screen.getByLabelText(/Number of People/i);
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    await user.type(billInput, '142.55');
    await user.click(tip15Button);
    await user.type(peopleInput, '5');

    expect(screen.getByText('$4.28')).toBeInTheDocument();
    expect(screen.getByText('$32.79')).toBeInTheDocument();

    expect(resetButton).toBeEnabled();

    await user.click(resetButton);

    expect(billInput).toHaveValue('');
    expect(peopleInput).toHaveValue('');
    expect(tip15Button).not.toHaveClass('bg-Grey-400 text-Green-900');
    expect(resetButton).toBeDisabled();

    const zeroResults = screen.getAllByText('$0.00');
    zeroResults.forEach((result) => {
      expect(result).toBeInTheDocument();
    });
  });
});
