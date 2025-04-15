import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SQLQuery = ({ token }) => {
  const [query, setQuery] = useState("SELECT 1+1 AS result");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedQueryName, setSelectedQueryName] = useState(
    "Select Predefined Query"
  );
  const textareaRef = useRef(null);

  const predefinedQueries = [
    {
      name: "Own Query",
      value: "",
    },
    {
      name: "DPF Filters by Branch",
      value: `
SELECT p.name AS product_name, 'KE' AS branch, ke.qty
FROM autodiely_eshop.ke_branch ke JOIN autodiely_eshop.products p ON ke.product_id = p._id
WHERE p.name LIKE '%DPF%'

UNION ALL

SELECT p.name, 'BL', bl.qty
FROM autodiely_eshop.bl_branch bl JOIN autodiely_eshop.products p ON bl.product_id = p._id
WHERE p.name LIKE '%DPF%'

UNION ALL

SELECT p.name, 'PP', pp.qty
FROM autodiely_eshop.pp_branch pp JOIN autodiely_eshop.products p ON pp.product_id = p._id
WHERE p.name LIKE '%DPF%'

UNION ALL

SELECT p.name, 'NR', nr.qty FROM autodiely_eshop.nr_branch nr
JOIN autodiely_eshop.products p ON nr.product_id = p._id WHERE p.name LIKE '%DPF%'

UNION ALL

SELECT p.name, 'SC', sc.qty FROM autodiely_eshop.sc_branch sc
JOIN autodiely_eshop.products p ON sc.product_id = p._id WHERE p.name LIKE '%DPF%'

ORDER BY product_name ASC;
      `,
    },
    {
      name: "Branches with Low 10W-40 Oil Stock",
      value: `
SELECT 'KE' AS branch, p.name AS product_name, IFNULL(ke.qty, 0) AS qty
FROM autodiely_eshop.products p LEFT JOIN autodiely_eshop.ke_branch ke ON ke.product_id = p._id
WHERE p.name LIKE '%10W-40%' AND IFNULL(ke.qty, 0) < 10

UNION ALL

SELECT 'BL', p.name, IFNULL(bl.qty, 0) FROM autodiely_eshop.products p
LEFT JOIN autodiely_eshop.bl_branch bl ON bl.product_id = p._id 
WHERE p.name LIKE '%10W-40%' AND IFNULL(bl.qty, 0) < 10

UNION ALL

SELECT 'PP', p.name, IFNULL(pp.qty, 0) FROM autodiely_eshop.products p
LEFT JOIN autodiely_eshop.pp_branch pp ON pp.product_id = p._id
WHERE p.name LIKE '%10W-40%' AND IFNULL(pp.qty, 0) < 10

UNION ALL

SELECT 'NR', p.name, IFNULL(nr.qty, 0) FROM autodiely_eshop.products p
LEFT JOIN autodiely_eshop.nr_branch nr ON nr.product_id = p._id
WHERE p.name LIKE '%10W-40%' AND IFNULL(nr.qty, 0) < 10

UNION ALL

SELECT 'SC', p.name, IFNULL(sc.qty, 0)
FROM autodiely_eshop.products p
LEFT JOIN autodiely_eshop.sc_branch sc ON sc.product_id = p._id
WHERE p.name LIKE '%10W-40%' AND IFNULL(sc.qty, 0) < 10

ORDER BY branch DESC;  
      `,
    },
    {
      name: "Categories with Average Prices",
      value: `
SELECT p.category, ROUND(AVG(p.price), 2) AS average_price
FROM (
  SELECT product_id FROM autodiely_eshop.ke_branch WHERE qty > 0
  UNION ALL
  SELECT product_id FROM autodiely_eshop.bl_branch WHERE qty > 0
  UNION ALL
  SELECT product_id FROM autodiely_eshop.pp_branch WHERE qty > 0
  UNION ALL
  SELECT product_id FROM autodiely_eshop.nr_branch WHERE qty > 0
  UNION ALL
  SELECT product_id FROM autodiely_eshop.sc_branch WHERE qty > 0
) AS available_products
JOIN autodiely_eshop.products p ON available_products.product_id = p._id
GROUP BY p.category ORDER BY average_price ASC;
      `,
    },
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const executeQuery = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/query/execute",
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      setResults({
        error: error.response?.data?.error || "Failed to execute query",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySelect = (selectedQuery) => {
    const selected = predefinedQueries.find((q) => q.value === selectedQuery);
    setQuery(selectedQuery || "SELECT 1+1 AS result");
    setSelectedQueryName(selected?.name || "Own Query");
    setOpenDropdown(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>SQL Query Tool</h1>

      <div style={{ marginBottom: "15px", position: "relative" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              style={{
                width: "100%",
                backgroundColor: "#fff",
                color: "#000",
                padding: "10px 15px",
                border: "1px solid #000",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{selectedQueryName}</span>
              <span
                style={{
                  transform: openDropdown ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                  fontSize: "12px",
                }}
              >
                ▼
              </span>
            </button>

            {openDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  zIndex: 10,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {predefinedQueries.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuerySelect(item.value)}
                    style={{
                      padding: "10px 15px",
                      cursor: "pointer",
                      borderBottom:
                        index < predefinedQueries.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={executeQuery}
            disabled={loading}
            style={{
              backgroundColor: "#000",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              minWidth: "120px",
              height: "40px",
            }}
          >
            {loading ? "Executing..." : "Execute Query"}
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "10px",
          marginBottom: "10px",
          fontFamily: "monospace",
          border: "1px solid #000",
          borderRadius: "6px",
          outline: "none",
          resize: "none",
          overflow: "hidden",
        }}
      />

      {results && (
        <div style={{ marginTop: "20px" }}>
          {results.error ? (
            <div
              style={{
                color: "red",
                padding: "10px",
                backgroundColor: "#ffebee",
                borderRadius: "6px",
                marginBottom: "20px",
              }}
            >
              Error: {results.error}
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: "20px", margin: "15px 0" }}>
                Results ({results.rows?.length || 0} rows)
              </h2>
              {results.rows?.length > 0 && (
                <div
                  style={{
                    overflowX: "auto",
                    maxHeight: "500px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                >
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      minWidth: "600px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f2f2f2",
                          position: "sticky",
                          top: 0,
                        }}
                      >
                        {Object.keys(results.rows[0]).map((key) => (
                          <th
                            key={key}
                            style={{
                              padding: "12px",
                              border: "1px solid #ddd",
                              textAlign: "left",
                              fontWeight: "500",
                            }}
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.rows.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((value, j) => (
                            <td
                              key={j}
                              style={{
                                padding: "12px",
                                border: "1px solid #ddd",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SQLQuery;