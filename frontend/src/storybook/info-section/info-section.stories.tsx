import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { InfoSection } from '~/bundles/common/components/info-section/info-section.js';

const meta: Meta<typeof InfoSection> = {
    component: InfoSection,
    title: 'Components/InfoSection',
    decorators: [
        (Story): JSX.Element => (
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Story />} />
                </Routes>
            </BrowserRouter>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InfoSection>;

const Sandbox: Story = {
    args: {
        title: 'Section',
        children: 'Info',
    },
};

export { Sandbox };
