import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CalculatorInput from './CalculatorInput';

const mockProps = {
  values: {
    billAmount: '',
    peopleAmount: '',
  },
  selectedTip: undefined,
  customTip: '',
  errors: {},
  onValueChange: vi.fn().mockReturnValue(vi.fn()),
  onTipClick: vi.fn(),
  onCustomTipChange: vi.fn(),
};

const renderCalculatorInput = (props = {}) => {
  render(<CalculatorInput {...mockProps} {...props} />);
};

describe('CalculatorInput', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  it('Should renders all inputs and tip buttons correctly', () => {
    renderCalculatorInput();

    const billInput = screen.getByLabelText(/Bill/i);
    const tipButtons = screen.getAllByRole('button', { name: /%/i });
    const customTipInput = screen.getByPlaceholderText(/Custom/i);
    const numberOfPeopleInput = screen.getByLabelText(/Number of People/i);

    expect(billInput).toBeInTheDocument();
    tipButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    expect(customTipInput).toBeInTheDocument();
    expect(numberOfPeopleInput).toBeInTheDocument();
  });

  it('Should displays error messages if errors are passed', () => {
    renderCalculatorInput({
      errors: { billAmount: "Can't be zero", peopleAmount: "Can't be zero" },
    });
    const errorsInfo = screen.getAllByText(/Can't be zero/i);

    errorsInfo.forEach((error) => {
      expect(error).toBeInTheDocument();
    });
  });

  it('Should call onValueChange when Bill input change', async () => {
    renderCalculatorInput();

    const billInput = screen.getByLabelText(/Bill/i);
    await user.type(billInput, '142.55');
    expect(mockProps.onValueChange).toHaveBeenCalledWith('billAmount');
  });

  it('Should call onValueChange when Number of people input change', async () => {
    renderCalculatorInput();

    const numberOfPeopleInput = screen.getByLabelText(/Number of People/i);
    await user.type(numberOfPeopleInput, '5');
    expect(mockProps.onValueChange).toHaveBeenCalledWith('peopleAmount');
  });

  it('Should call onTipClick when Tip button is clicked', async () => {
    renderCalculatorInput();

    const tip15Button = screen.getByRole('button', { name: '15%' });
    await user.click(tip15Button);
    expect(mockProps.onTipClick).toHaveBeenCalled();
  });

  it('Should call onCustomTipChange when Custom tip input change', async () => {
    renderCalculatorInput();

    const customTipInput = screen.getByPlaceholderText(/Custom/i);
    await user.type(customTipInput, '20');
    expect(mockProps.onCustomTipChange).toHaveBeenCalled();
  });
});
