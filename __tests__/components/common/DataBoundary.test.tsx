import DataBoundary from "@/components/common/DataBoundary";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/jest-globals';

jest.mock("@/components/common/LoadingSpinner", () => () => <div>Mocked</div>);
jest.mock("@/components/common/DataFailed", () => ({ message }: { message: string }) => (
    <div>{message}</div>
));

const children = "children";
describe("DataBoundary", () => {
    it("display LoadingSpinner", () => {
        render(
            <DataBoundary isLoading={true} error={null}>
                <div>{children}</div>
            </DataBoundary>
        );
        expect(screen.getByText("Mocked")).toBeInTheDocument();
        expect(screen.queryByText(children)).not.toBeInTheDocument();
    });

    it("display DataFailed", () => {
        const errorMessage = "error message";
        render(
            <DataBoundary isLoading={false} error="Error occurred" errorMessage={errorMessage}>
                <div>{children}</div>
            </DataBoundary>
        );
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.queryByText(children)).not.toBeInTheDocument();
    });

    it("display children", () => {
        render(
            <DataBoundary isLoading={false} error={null}>
                <div>{children}</div>
            </DataBoundary>
        );
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
