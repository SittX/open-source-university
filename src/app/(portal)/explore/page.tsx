import CoursePreviewCard from "@/components/course/CoursePreviewCard";
import React from "react";

const SearchPage = () => {
  const availableCourses = [
    {
      id: "5",
      title: "Cybersecurity Essentials",
      description:
        "Comprehensive introduction to cybersecurity principles and practices",
      imageUrl:
        "/placeholder.svg?height=200&width=300&text=Cybersecurity+Course",
      price: 159,
      isPublished: true,
      createdAt: new Date("2023-01-01"),
      createdBy: "admin",
      updatedAt: new Date("2023-01-10"),
      categoryId: "security",
      instructor: "Prof. Lisa Anderson",
      originalPrice: 199,
      duration: "6 weeks",
      rating: 4.8,
      students: 1743,
      category: "Security",
      level: "Beginner",
      tags: ["Security", "Network", "Ethics"],
      featured: true,
      bestseller: false,
      new: false,
    },
    {
      id: "6",
      title: "Advanced JavaScript & ES6+",
      description:
        "Master modern JavaScript features and advanced programming concepts",
      imageUrl: "/placeholder.svg?height=200&width=300&text=JavaScript+Course",
      price: 129,
      isPublished: true,
      createdAt: new Date("2023-02-01"),
      createdBy: "admin",
      updatedAt: new Date("2023-02-10"),
      categoryId: "programming",
      instructor: "Mark Thompson",
      originalPrice: 179,
      duration: "8 weeks",
      rating: 4.9,
      students: 2156,
      category: "Programming",
      level: "Advanced",
      tags: ["JavaScript", "ES6", "Programming"],
      featured: false,
      bestseller: true,
      new: false,
    },
    {
      id: "7",
      title: "Mobile App Development with Flutter",
      description:
        "Build cross-platform mobile applications using Flutter and Dart",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Flutter+Course",
      price: 189,
      isPublished: true,
      createdAt: new Date("2023-03-01"),
      createdBy: "admin",
      updatedAt: new Date("2023-03-10"),
      categoryId: "mobile",
      instructor: "Dr. Jennifer Kim",
      originalPrice: 249,
      duration: "10 weeks",
      rating: 4.7,
      students: 987,
      category: "Mobile Development",
      level: "Intermediate",
      tags: ["Flutter", "Dart", "Mobile"],
      featured: false,
      bestseller: false,
      new: true,
    },
    {
      id: "8",
      title: "Cloud Computing with AWS",
      description:
        "Learn cloud architecture and deployment strategies with Amazon Web Services",
      imageUrl: "/placeholder.svg?height=200&width=300&text=AWS+Course",
      price: 199,
      isPublished: true,
      createdAt: new Date("2023-04-01"),
      createdBy: "admin",
      updatedAt: new Date("2023-04-10"),
      categoryId: "cloud",
      instructor: "Prof. Robert Chen",
      originalPrice: 279,
      duration: "12 weeks",
      rating: 4.6,
      students: 1432,
      category: "Cloud Computing",
      level: "Intermediate",
      tags: ["AWS", "Cloud", "DevOps"],
      featured: true,
      bestseller: false,
      new: false,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {availableCourses.map((course) => (
          <CoursePreviewCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
