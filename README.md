# Aegis Vision

A sophisticated dashboard and control plane for a real-time AI video analytics platform, focusing on data visualization and system management.

Aegis Vision is a sophisticated, visually stunning dashboard and control plane for a next-generation, AI-driven video analytics platform. This application provides the complete, high-fidelity user interface for managing and monitoring such a system. Users can view simulated live video feeds, receive real-time alerts, configure camera streams and detection zones, and analyze historical data through interactive charts and reports. The application is designed as a masterpiece of data visualization and user experience, providing a seamless and intuitive 'mission control' for complex security and operational monitoring.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/AegisVision-20251007-025031)

## Key Features

*   **Mission Control Dashboard**: A comprehensive overview of all monitored activity, featuring a grid of live video feeds, a real-time event log, and key performance indicators (KPIs).
*   **Stream Management**: Easily add, configure, and manage video sources like IP cameras and RTSP feeds.
*   **Analytics & Reports**: A data visualization hub with interactive charts for exploring historical trends in foot traffic, demographics, and alert frequency.
*   **Alerts History**: A comprehensive, searchable, and filterable log of all historical alerts with detailed information.
*   **Modern UI/UX**: A stunning dark-themed, data-centric design built for clarity and intuitive interaction in a security operations environment.
*   **Responsive Design**: Flawless performance and layout across all devices, from large monitors to mobile screens.

## Technology Stack

*   **Frontend**: React, Vite, React Router
*   **Styling**: Tailwind CSS, shadcn/ui
*   **State Management**: Zustand
*   **Data Visualization**: Recharts
*   **Icons**: Lucide React
*   **Animations**: Framer Motion
*   **Backend**: Cloudflare Workers

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   A [Cloudflare account](https://dash.cloudflare.com/sign-up).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/aegis_vision.git
    cd aegis_vision
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.dev.vars` file in the root of the project for local development. The backend AI features require Cloudflare AI Gateway credentials, but the frontend UI will function with mocked data without them.

    ```ini
    # .dev.vars

    # Required for AI features via Cloudflare AI Gateway
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

### Running the Development Server

To start the local development server, which includes the Vite frontend and the Cloudflare Worker backend, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

*   `src/`: Contains all the frontend React application code, including pages, components, stores, and styles.
*   `worker/`: Contains the Cloudflare Worker backend code, which serves the mock API and handles application logic.
*   `public/`: Static assets that are served directly.

## Deployment

This project is designed for seamless deployment to Cloudflare Pages.

1.  **Login to Wrangler:**
    ```bash
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to your Cloudflare account.

    ```bash
    bun deploy
    ```

3.  **Deploy with the button:**
    Alternatively, you can deploy this project to Cloudflare with a single click.

## License

This project is licensed under the MIT License - see the LICENSE file for details.