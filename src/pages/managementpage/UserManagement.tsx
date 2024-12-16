import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import supabase from "@/config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const filteredUsers = users.filter(user =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   user.email.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  //Lấy tất cả người dùng
  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        console.error("Error fetching profiles:", error);
      } else {
        console.log(data);

        setProfiles(data || []);
      }
      setLoading(false);
    }

    fetchProfiles();
  }, []);

  const handleStatusToggle = (userId: string) => {};

  const handleActiveUser = () => {};

  async function setUserToActive(user_id: string, status: string): void {
    let status_after = status;
    if (status === "ENABLE") status_after = "DISABLE";
    else status_after = "ENABLE";

    const { data, error } = await supabase
      .from("profiles")
      .update({ status: status_after })
      .eq("user_id", user_id);

    if (error) {
      console.error("Error fetching profiles:", error);
    } else {
      console.log(data);
      navigate("/admin/users");
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {/* <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>Email</TableHead> */}
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>
                <Link
                  to={`/admin/userdetail/${user.user_id}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.display_name}
                </Link>
              </TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setUserToActive(user.user_id, user.status)}
                    >
                      {user.status === "DISABLE" ? <>ENABLE</> : <>DISABLE</>}
                    </Button>
                  </DialogTrigger>
                  {/* <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to {user.status === "DISABLE" ? <>enable</> : <>disable</>} this user?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the user
                          account and remove their data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setUserToActive(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleActiveUser}>{user.status === "DISABLE" ? <>ENABLE</> : <>DISABLE</>}</Button>
                      </DialogFooter>
                    </DialogContent> */}
                </Dialog>
              </TableCell>
              \{" "}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
