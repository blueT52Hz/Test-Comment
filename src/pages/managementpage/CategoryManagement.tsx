'use client'

import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getAllCategoriesFromTo, addCategory, updateCategory, getAllCategoriesByContainsFromTo } from "@/service/category";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}


export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({ name: '', description: '', slug: '' });
  const [errors, setErrors] = useState<{
    name: string;
    description: string;
    slug: string;
  }>({ name: '', description: '', slug: '' });
  const POSTPERPAGES = 6;
  const [total, setTotal] = useState(0)
  const pageCount = Math.ceil(total / POSTPERPAGES);
  const { toast } = useToast()

  useEffect(() => {
    setNewCategory({ name: '', description: '', slug: '' });
    setErrors({ name: '', description: '', slug: '' })
  }, [isAddDialogOpen])
  const fetchData = async () => {
    const startIndex = (currentPage - 1) * POSTPERPAGES;
    const endIndex = startIndex + POSTPERPAGES - 1;
    if (searchTerm) {
      const { data, total } = await getAllCategoriesByContainsFromTo(searchTerm, startIndex, endIndex);
      setCategories(data);
      setTotal(total)
    } else {
      const { data, total } = await getAllCategoriesFromTo(startIndex, endIndex);
      setCategories(data);
      setTotal(total)
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const filteredCategories = categories.filter(
    (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const validateForm = (category: Omit<Category, 'id'>) => {
    const newErrors = { name: '', description: '', slug: '' };
    let isValid = true;

    if (!category.name.trim()) {
      newErrors.name = 'Tên không được để trống';
      isValid = false;
    }

    if (!category.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
      isValid = false;
    }

    if (!category.slug.trim()) {
      newErrors.slug = 'Slug không được để trống';
      isValid = false;
    } else if (!/^[a-z0-9-]+$/.test(category.slug)) {
      newErrors.slug = 'Slug chỉ được chứa chữ cái không dấu, số và dấu gạch ngang';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddCategory = async () => {
    if (validateForm(newCategory)) {
      try {
        await addCategory(newCategory);
        setIsAddDialogOpen(false);
        setNewCategory({ name: '', description: '', slug: '' });
        fetchData()
        toast({
          title: "Thành công",
          description: "Danh mục mới đã được thêm.",
        })
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể thêm danh mục mới.",
          variant: "destructive",
        })
      }
    }
  };

  const handleEditCategory = async () => {
    if (selectedCategory && validateForm(selectedCategory)) {
      try {
        await updateCategory(selectedCategory.id, selectedCategory);
        setIsEditDialogOpen(false);
        setSelectedCategory(null);
        fetchData()
        toast({
          title: "Thành công",
          description: "Danh mục đã được cập nhật.",
        })
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật danh mục.",
          variant: "destructive",
        })
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 transition-colors">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Enter the details for the new category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <div className="col-span-3">
                  <Input
                    id="description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <div className="col-span-3">
                  <Input
                    id="slug"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase() })}
                    className={errors.slug ? "border-red-500" : ""}
                  />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.length && filteredCategories.map((category) => (
            <TableRow key={category.id} className="hover:bg-gray-100 transition-colors">
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-100 transition-colors"
                      onClick={() => setSelectedCategory(category)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        Make changes to the category details.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedCategory && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <div className="col-span-3">
                            <Input
                              id="edit-name"
                              value={selectedCategory.name}
                              onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                              className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-description" className="text-right">
                            Description
                          </Label>
                          <div className="col-span-3">
                            <Input
                              id="edit-description"
                              value={selectedCategory.description}
                              onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                              className={errors.description ? "border-red-500" : ""}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-slug" className="text-right">
                            Slug
                          </Label>
                          <div className="col-span-3">
                            <Input
                              id="edit-slug"
                              value={selectedCategory.slug}
                              onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value.toLowerCase() })}
                              className={errors.slug ? "border-red-500" : ""}
                            />
                            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button onClick={handleEditCategory}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={categories.length < POSTPERPAGES}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div> */}
      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={`${currentPage === 1
                ? "opacity-50 cursor-not-allowed border-primary"
                : "hover:bg-primary hover:text-primary-foreground"
                } transition-colors duration-200`}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                isActive={currentPage === i + 1}
                className={`${currentPage === i + 1
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-primary/10 hover:border-primary"
                  } transition-colors duration-200`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < pageCount) setCurrentPage(currentPage + 1);
              }}
              className={`${currentPage === pageCount
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary hover:text-primary-foreground"
                } transition-colors duration-200`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Toaster />
    </div>
  );
}

