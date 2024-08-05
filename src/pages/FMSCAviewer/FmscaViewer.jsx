import { Box } from '@mui/material'
import './FmscaViewer.css'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
    { field: 'created_dt', headerName: 'Created_DT', width: 150},
    { field: 'data_source_modified_dt', headerName: 'Modifed_DT', width: 150 },
    { field: 'entity_type', headerName: 'Entity', width: 150 },
    { field: 'operating_status', headerName: 'Operating status', width: 150 },
    { field: 'legal_name', headerName: 'Legal name', width: 150 },
    { field: 'dba_name', headerName: 'DBA name', width: 150 },
    { field: 'physical_address', headerName: 'Physical address', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'usdot_number', headerName: 'DOT', width: 150 },
    { field: 'mc_mx_ff_number', headerName: 'MC/MX/FF', width: 150 },
    { field: 'power_units', headerName: 'Power units', width: 150 },
    { field: 'out_of_service_date', headerName: 'Out of service date', width: 150 },
]

const API_URL = 'https://script.google.com/macros/s/AKfycbx4QHEUk7P9QhHfeN3h8B4CBLndtLo5S90kgft-gASW3hesHEkm-K17i5BqZUJkUBIfSQ/exec';

const FmscaViewer = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GetAllExcleSheetData = async() => {
        try {
            const response = await axios.get(API_URL);
            let Data = response.data
            let output=[]
            for (let i = 1; i < Data.length; i++) {
                let row = {}

                row["created_dt"] = Data[i][0]
                row["data_source_modified_dt"] = Data[i][1]
                row["entity_type"] = Data[i][2]
                row["operating_status"] = Data[i][3]
                row["legal_name"] = Data[i][4]
                row["dba_name"] = Data[i][5]
                row["physical_address"] = Data[i][6]
                row["p_street"] = Data[i][7]
                row["p_city"] = Data[i][8]
                row["p_state"] = Data[i][9]
                row["p_zip_code"] = Data[i][10]
                row["phone"] = Data[i][11]
                row["mailing_address"] = Data[i][12]
                row["m_street"] = Data[i][13]
                row["m_city"] = Data[i][14]
                row["m_state"] = Data[i][15]
                row["m_zip_code"] = Data[i][16]
                row["usdot_number"] = Data[i][17]
                row["mc_mx_ff_number"] = Data[i][18]
                row["power_units"] = Data[i][19]
                row["mcs_150_form_date"] = Data[i][20]
                row["out_of_service_date"] = Data[i][21]
                row["state_carrier_id_number"] = Data[i][22]
                row["duns_number"] = Data[i][23]
                row["drivers"] = Data[i][24]
                row["mcs_150_mileage_year"] = Data[i][25]
                row["credit_score"] = Data[i][26]
                row["id"] = Data[i][27]
                row["record_status"] = Data[i][28]
                output.push(row)
            }
            let Rows = output.map((item, index) => (({ indexId: index, ...item })));
            console.log(Rows)
            setData(Rows);
            setLoading(false);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
      GetAllExcleSheetData()
    },[])

    if (loading) return <p style={{textAlign:'center', padding:'20px'}}>Fetching Data From Excel Sheet...</p>;
    if (error) return <p style={{textAlign:'center', padding:'20px'}}>Error: {error.message}</p>;
    return (
        <Box className='container'>
            <Box sx={{ padding:'30px 30px'}}>
                <div style={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={(row) => row.indexId}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        headerClassName="custom-header"
                        pageSizeOptions={[10, 20, 50]}
                        checkboxSelection={false}
                    />
                </div>
            </Box>
        </Box>
    )
}
export default FmscaViewer