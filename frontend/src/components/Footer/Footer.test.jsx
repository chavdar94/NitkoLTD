import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
	it('renders without errors', () => {
		render(<Footer />);
		expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Assuming role="contentinfo" is appropriate
	});

	it('renders social links with correct href attributes', () => {
		render(<Footer />);

		const links = screen.getAllByRole('link');
		expect(links[0]).toHaveAttribute(
			'href',
			'https://www.facebook.com/profile.php?id=100000919454896'
		);
		expect(links[1]).toHaveAttribute(
			'href',
			'https://github.com/chavdar94'
		);
		expect(links[2]).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/chavdar-tonchev-818919235/'
		);
	});

	it('displays the correct text content', () => {
		render(<Footer />);
		expect(screen.getByText('Свържете се с мен')).toBeInTheDocument();
		expect(
			screen.getByText('All rights reserved Чавдар Тончев ©')
		).toBeInTheDocument();
	});
});
