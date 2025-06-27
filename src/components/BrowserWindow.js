import React, { useState, useEffect } from 'react';

const BrowserWindow = ({ title = "My Browser", url = "http://localhost:3000", language = "text", children }) => {
  // State to manage the current theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect hook to detect system theme preference and set initial theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    // Listen for changes in system theme
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Define styles for dark mode and light mode
  const windowStyles = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "100%",
    margin: "0",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    background: isDarkMode ? "#333" : "#fff", // Change window background color based on the theme
    color: isDarkMode ? "#fff" : "#000", // Change text color based on the theme
  };

  const headerStyles = {
    background: isDarkMode ? "#222" : "#f3f3f3", // Header background
    padding: "8px",
    display: "flex",
    alignItems: "center",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    justifyContent: "space-between",
  };

  const addressBarStyles = {
    flexGrow: 1,
    background: isDarkMode ? "#444" : "#fff", // Address bar background
    padding: "4px 10px",
    margin: "0 10px",
    borderRadius: "6px",
    fontSize: "12px",
    color: isDarkMode ? "#ddd" : "#333", // Address bar text color
    textAlign: "center",
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const bodyStyles = {
    padding: "16px",
    background: isDarkMode ? "#222" : "#fff", // Body background
    overflow: "auto",
    color: isDarkMode ? "#fff" : "#000", // Body text color
  };

  return (
    <div style={windowStyles}>
      {/* Header (Circles + Address Bar) */}
      <div style={headerStyles}>
        {/* Left Section: Circles & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ background: "#ff5f57", width: "12px", height: "12px", borderRadius: "50%" }}></span>
          <span style={{ background: "#ffbd2e", width: "12px", height: "12px", borderRadius: "50%" }}></span>
          <span style={{ background: "#28c840", width: "12px", height: "12px", borderRadius: "50%" }}></span>

          {/* Title */}
          <span style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "8px" }}>
            {title}
          </span>
        </div>

        {/* Address Bar */}
        <div style={addressBarStyles}>
          {url}
        </div>

        {/* Right Section: Language Badge */}
        <div style={{
          background: isDarkMode ? "#555" : "#e0e0e0",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
          color: isDarkMode ? "#ccc" : "#666",
        }}>
          {language}
        </div>
      </div>

      {/* Body (Content) */}
      <div style={bodyStyles}>
        <pre style={{ margin: 0 }}>
          <code className={`language-${language}`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default BrowserWindow;
