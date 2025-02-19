import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Pagination,
} from "@mui/material";
import { Refresh, Error } from "@mui/icons-material";
import { useCompany } from "@/contexts/company.provider";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const { company, setCompany } = useCompany();
  const [inputValue, setInputValue] = useState<string>(company);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;


  const paginatedMembers = members.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  const fetchMembers = () => {
    setLoading(true);
    setCompany(inputValue);
    fetch(`https://api.github.com/orgs/${inputValue}/members`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          setMembers(json);
          setError("");
        }
      })
      .catch((error) => {
        setError(error.message);
        setMembers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    fetchMembers();
  }, []);


  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };


  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          label="Organization Name"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ display: "block", width: "100%" }}
        />
        <Button
          variant="contained"
          onClick={fetchMembers}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Refresh />}
          style={{ padding: 20,  marginTop: 10, marginBottom: 10 }}
        >
          Load Members
        </Button>
        <Divider style={{ width: '100%', marginBottom: 10}} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Error />
            {error}
          </Box>
        </Alert>
      )}

      {members && members.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Total Members of {capitalize(company)}: {members.length}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <img
                        src={member.avatar_url}
                        alt={`${member.login}'s avatar`}
                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                      />
                    </TableCell>
                    <TableCell>{member.id}</TableCell>
                    <TableCell>
                      <Link
                        to={`/detail/${member.login}`}
                        style={{ color: "#1976d2", textDecoration: "none" }}
                      >
                        {member.login}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(members.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}

      {!members.length && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No members found for this organization.
        </Alert>
      )}
      
      {/* <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Link
          to="/rick-morty"
          style={{ 
            color: "#1976d2", 
            textDecoration: "none",
            display: "block",
            padding: "10px 16px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
            fontWeight: 500,
          }}
        >
          Go to Rick and Morty Characters
        </Link>
      </Box> */}
    </Box>
  );
};