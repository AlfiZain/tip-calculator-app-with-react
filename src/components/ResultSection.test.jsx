import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from 'vitest';
import ResultSection from './ResultSection';
import userEvent from '@testing-library/user-event';

const mockProps = {
  results: {
    tipTotal: 0,
    billTotal: 0,
  },
  onResetClick: vi.fn(),
};

const renderResultSection = (props = {}) => {
  render(<ResultSection {...mockProps} {...props} />);
};

describe('ResultSection', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  it('Should render tip total, bill total and Reset button, tip and bill total must have value $0.00, Reset button must be disabled', () => {
    renderResultSection();

    const resultsText = screen.getAllByText('$0.00');
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    resultsText.forEach((result) => {
      expect(result).toBeInTheDocument();
    });
    expect(resetButton).toBeDisabled();
  });

  it('Should display tip total and bill total correctly if results passed, Reset button must be enable', () => {
    renderResultSection({
      results: { tipTotal: 4.28, billTotal: 32.79 },
    });

    const tipTotalText = screen.getByText('$4.28');
    const billTotalText = screen.getByText('$32.79');
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    expect(tipTotalText).toBeInTheDocument();
    expect(billTotalText).toBeInTheDocument();
    expect(resetButton).toBeEnabled();
  });

  it('Should not allowed Reset button to be clicked when result.billTotal <= 0', async () => {
    renderResultSection();

    const resetButton = screen.getByRole('button', { name: /RESET/i });

    await user.click(resetButton);

    expect(resetButton).toBeDisabled();
    expect(mockProps.onResetClick).not.toHaveBeenCalled();
  });

  it('Should call onResetClick when Reset button is clicked', async () => {
    renderResultSection({
      results: { tipTotal: 4.28, billTotal: 32.79 },
    });

    const resetButton = screen.getByRole('button', { name: /RESET/i });

    await user.click(resetButton);

    expect(mockProps.onResetClick).toHaveBeenCalled();
  });
});
