"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getUser } from "@/app/(page)/profile/services/userService"; // Importa tu función aquí
import { ProfileLink } from "@/types/ui/Profile";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const profileLinks: ProfileLink[] = [
  { label: "Editar perfil", href: "/settings" },
  // { label: "Biblioteca", href: "/library" },
  { label: "Cerrar sesión", href: "/" },
];

const Profile = () => {
  const pathname = usePathname();
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [contact, setContact] = useState("");

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      if (userData) {
        setUsername(userData.username);
        setEmail(userData.email);
        setUserImage(userData.userImage);
        setContact(userData.contact);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col justify-evenly w-full min-h-screen md:w-5/6 mx-auto py-4 p-2">
      <section className="flex flex-col md:flex-row items-center text-white text-xl">
        <div className="w-90 md:w-36 lg:w-48 xl:w-64 text-center">
          <Image
            src={userImage || "/avatar.jpg"}
            alt="avatar"
            width={834}
            height={227}
            className="object-contain w-full h-auto rounded-full border-4 border-primary"
          />
          <h3 className="m-2 font-bold">{username}</h3>
        </div>
        <div className="w-90 md:w-36 lg:w-48 xl:w-64 text-left mx-10">
          <h3 className="m-2">
            <span className="font-bold">Email:</span> {email}
          </h3>
          <div className="flex items-center">
            <h3 className="m-2">
              <span className="font-bold">Contacto:</span> {contact}
            </h3>
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center w-90">
        {profileLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`text-lg transition-colors m-2 ${
              pathname === href
                ? "text-primary"
                : "text-white hover:text-primary"
            }`}
          >
            <Button>{label}</Button>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Profile;
