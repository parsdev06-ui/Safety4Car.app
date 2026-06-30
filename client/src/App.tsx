import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DevRoleSwitcher } from "./components/DevRoleSwitcher";

// Public Pages
import Home from "./pages/public/Home";
import Pricing from "./pages/public/Pricing";
import HowItWorks from "./pages/public/HowItWorks";

// Client Pages
import BookingPackage from "./pages/client/BookingPackage";
import BookingVehicle from "./pages/client/BookingVehicle";
import BookingAppointment from "./pages/client/BookingAppointment";
import CheckoutPreview from "./pages/client/CheckoutPreview";
import BookingSuccess from "./pages/client/BookingSuccess";
import CustomerDashboard from "./pages/client/CustomerDashboard";
import CustomerOrders from "./pages/client/CustomerOrders";
import CustomerReports from "./pages/client/CustomerReports";
import CustomerComplaint from "./pages/client/CustomerComplaint";

// Inspector Pages
import InspectorDashboard from "./pages/inspector/InspectorDashboard";
import InspectorOrders from "./pages/inspector/InspectorOrders";
import InspectorOrderDetail from "./pages/inspector/InspectorOrderDetail";
import InspectionDetail from "./pages/inspector/InspectionDetail";
import InspectionSubmit from "./pages/inspector/InspectionSubmit";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminPartnerDetail from "./pages/admin/AdminPartnerDetail";
import AdminReports from "./pages/admin/AdminReports";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";

// Customer Success Pages
import CSDashboard from "./pages/cs/CSDashboard";
import CSTickets from "./pages/cs/CSTickets";
import CSTicketDetail from "./pages/cs/CSTicketDetail";
import CSCustomers from "./pages/cs/CSCustomers";
import CSOrders from "./pages/cs/CSOrders";
import CSComplaints from "./pages/cs/CSComplaints";

import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/preise" component={Pricing} />
      <Route path="/so-funktionierts" component={HowItWorks} />

      {/* Client Routes */}
      <Route path="/booking/package" component={BookingPackage} />
      <Route path="/booking/vehicle" component={BookingVehicle} />
      <Route path="/booking/appointment" component={BookingAppointment} />
      <Route path="/booking/checkout-preview" component={CheckoutPreview} />
      <Route path="/booking/success" component={BookingSuccess} />
      <Route path="/customer/dashboard" component={CustomerDashboard} />
      <Route path="/customer/orders/:id" component={CustomerOrders} />
      <Route path="/customer/reports/:id" component={CustomerReports} />
      <Route path="/customer/complaint" component={CustomerComplaint} />

      {/* Inspector Routes */}
      <Route path="/inspector/dashboard" component={InspectorDashboard} />
      <Route path="/inspector/orders" component={InspectorOrders} />
      <Route path="/inspector/orders/:id" component={InspectorOrderDetail} />
      <Route path="/inspector/inspection/:id" component={InspectionDetail} />
      <Route path="/inspector/inspection/:id/submit" component={InspectionSubmit} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/orders/:id" component={AdminOrderDetail} />
      <Route path="/admin/partners" component={AdminPartners} />
      <Route path="/admin/partners/:id" component={AdminPartnerDetail} />
      <Route path="/admin/reports" component={AdminReports} />
      <Route path="/admin/payments" component={AdminPayments} />
      <Route path="/admin/complaints" component={AdminComplaints} />
      <Route path="/admin/audit-logs" component={AdminAuditLogs} />

      {/* Customer Success Routes */}
      <Route path="/cs/dashboard" component={CSDashboard} />
      <Route path="/cs/tickets" component={CSTickets} />
      <Route path="/cs/tickets/:id" component={CSTicketDetail} />
      <Route path="/cs/customers" component={CSCustomers} />
      <Route path="/cs/orders" component={CSOrders} />
      <Route path="/cs/complaints" component={CSComplaints} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <DevRoleSwitcher />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
