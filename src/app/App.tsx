import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { SearchInstructors } from "./pages/SearchInstructors";
import { BookLessonPage } from "./pages/BookLessonPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Instructor } from "./types/Instructor";
import { VehiclesPage } from "./pages/VehiclesPage";
import { EditVehiclePage } from "./pages/EditVehiclePage";
import { InstructorCalendarPage } from "./pages/InstructorCalendarPage";
import { InstructorReviewsPage } from "./pages/InstructorReviewsPage";

type Page =
  | "home"
  | "login"
  | "student-dashboard"
  | "instructor-dashboard"
  | "search-instructors"
  | "book-lesson"
  | "my-lessons"
  | "favorites"
  | "profile"
  | "vehicles"
  | "add-vehicle"
  | "edit-vehicle"
  | "lessons"
  | "about"
  | "register"
  | "reviews"
  | "about";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedInstructor, setSelectedInstructor] = useState<
    any
  >();
  //const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const { isAuthenticated, isInstructor } = useAuth();

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectInstructor = (instructor: any) => {
    setSelectedInstructor(instructor);
  };

  // const handleSelectVehicle = (vehicle: any) => {
  //   setSelectedVehicle(vehicle);
  // };
  
  const getSelectedVehicleId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedVehicleId");
    }
    return null;
  };

  const clearSelectedVehicleId = () => {
    localStorage.removeItem("selectedVehicleId");
    localStorage.removeItem("selectedVehicle");
  };

  useEffect(() => {
    const protectedPages: Page[] = [
      "student-dashboard",
      "instructor-dashboard",
      "book-lesson",
      "my-lessons",
      "favorites",
      "profile",
      "vehicles",
      "add-vehicle",
      "edit-vehicle",
      "reviews",
      "lessons",
    ];

    if (!isAuthenticated && protectedPages.includes(currentPage)) {
      setCurrentPage("login");
    }
  }, [isAuthenticated, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;

      case "login":
        return <LoginPage onNavigate={handleNavigate} />;

      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;

      case "student-dashboard":
        return <StudentDashboard onNavigate={handleNavigate} />;

      case "instructor-dashboard":
        return <InstructorDashboard onNavigate={handleNavigate} />;

      case "search-instructors":
        return (
          <SearchInstructors
            onNavigate={handleNavigate}
            onSelectInstructor={handleSelectInstructor}
          />
        );

      case "book-lesson":
        return (
          <BookLessonPage
            onNavigate={handleNavigate}
            selectedInstructor={selectedInstructor}
          />
        );

      case "my-lessons":
        return <StudentDashboard onNavigate={handleNavigate} />;

      case "favorites":
        return (
          <div className="min-h-screen bg-gray-50 pt-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Instrutores Favoritos
              </h1>
              <SearchInstructors
                onNavigate={handleNavigate}
                onSelectInstructor={handleSelectInstructor}
              />
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="min-h-screen bg-gray-50 pt-8">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Meu Perfil
                </h1>
                <p className="text-gray-600">
                  Página de perfil em desenvolvimento...
                </p>
              </div>
            </div>
          </div>
        );

      case "vehicles":
        return (
          <VehiclesPage
            onNavigate={handleNavigate}
            onSelectInstructor={handleSelectInstructor}
          />
        );

      case "add-vehicle":
        return <EditVehiclePage onNavigate={handleNavigate} />;

      case "edit-vehicle":
        const vehicleId = getSelectedVehicleId();
        return (
          <EditVehiclePage
            onNavigate={(page) => {
              clearSelectedVehicleId();
              handleNavigate(page);
            }}
            vehicleId={vehicleId || undefined}
          />
        );

      case "lessons":
        if (isInstructor) {
          return <InstructorCalendarPage onNavigate={handleNavigate} />;
        } else {
          return <StudentDashboard onNavigate={handleNavigate} />;
        }
      case "reviews":
        if (isInstructor) {
          return <InstructorReviewsPage onNavigate={handleNavigate} />;
        } else {
          return <StudentDashboard onNavigate={handleNavigate} />;
        }
      case "about":
        return (
          <div className="min-h-screen bg-gray-50 pt-8">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  Sobre Nós
                </h1>
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    A AutoMatch é a plataforma líder em conectar alunos e
                    instrutores de direção em todo o Brasil.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Nossa missão é tornar o processo de aprendizado mais
                    acessível, transparente e eficiente.
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Nossa História
                  </h2>
                  <p className="text-gray-600">
                    Fundada em 2025, a AutoMatch nasceu da necessidade de
                    modernizar o mercado de AutoMatchs, trazendo tecnologia e
                    praticidade para alunos e instrutores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const showHeader = currentPage !== "login";
  const showFooter = currentPage !== "login";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      <main className="flex-1">{renderPage()}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}
