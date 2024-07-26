import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import useSWR from 'swr';
import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";
import { fetcher } from "../lib/api";
import { faker } from "@faker-js/faker";

interface Styles {
  card: React.CSSProperties;
  img: React.CSSProperties;
  container: React.CSSProperties;
  dottedLine: React.CSSProperties;
  splitLineContainer: React.CSSProperties;
  splitLineVertical: React.CSSProperties;
  splitLineHorizontal: React.CSSProperties;
  textContainer: React.CSSProperties;
}

const styles: Styles = {
  card: {
    width: 390,
    height: 150,
    textAlign: "left",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center"
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    margin: "10px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: "6px"
  },
  dottedLine: {
    borderLeft: "1.5px dotted grey",
    height: "65px",
    position: "relative",
    left: "0%",
    transform: "translateX(-50%)"
  },
  splitLineContainer: {
    position: "relative",
    height: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  splitLineVertical: {
    height: "50px",
    border: "1.5px dotted grey"
  },
  splitLineHorizontal: {
    position: "absolute",
    top: "100%",
    width: "400px",
    border: "1.5px dotted grey"
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "left"
  }
};

interface Profile {
  attributes: {
    name: string;
    designation: string;
    department: string;
  };
  img?: string;
}

interface OrgTreeProps {
  initialProfiles: Profile[];
}

const OrgTree: React.FC<OrgTreeProps> = ({ initialProfiles }) => {
  const { user } = useFetchUser();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/managers`,
    fetcher,
    {
      fallbackData: initialProfiles,
    }
  );

  if (error) {
    console.error("Error fetching data:", error);
    // Handle error state here if needed
  }

  const profiles = data?.data || initialProfiles || [];
  console.log("Profiles:", profiles); // Log profiles to check data
  
  const generateAvatarUrl = () => {
    return faker.image.avatar();
  };

  return (
    <Box style={styles.container}>
      {profiles.map((profile, index) => (
        <React.Fragment key={index}>
          <Card style={styles.card}>
            <img
              src={profile.img || generateAvatarUrl()}  // Use profile.img if available, otherwise generate a fake avatar
              alt="Profile"
              style={styles.img}
            />
            <CardContent style={styles.textContainer}>
              <Typography
                variant="h6"
                style={{
                  color: "#333",
                  fontStyle: "italic",
                  marginBottom: "5px"
                }}
              >
                {profile.attributes.name}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "#333",
                  fontStyle: "italic",
                  marginBottom: "5px"
                }}
              >
                {profile.attributes.designation}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: "#333",
                  fontStyle: "italic"
                }}
              >
                {profile.attributes.department}
              </Typography>
            </CardContent>
          </Card>
          {index < profiles.length - 1 && <Box style={styles.dottedLine} />}
        </React.Fragment>
      ))}
      <Box style={styles.splitLineContainer}>
        <Box style={styles.splitLineVertical} />
        <Box style={{ ...styles.splitLineHorizontal, left: "calc(50% - 52px)" }} />
        <Box style={{ ...styles.splitLineHorizontal, right: "calc(50% - 52px)" }} />
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  try {
    const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/managers`);
    return {
      props: {
        initialProfiles: response || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialProfiles: [],
      },
    };
  }
}

export default OrgTree;
