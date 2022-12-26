
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Accordian.module.css'

const AccordianComp = () => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon=""
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <div className={styles.detailCont}>
                    <div className={styles.date}>
                        <h3>19</h3>
                        <h5 className={styles.specialP}>Dec</h5>
                    </div>
                    <div className={styles.userDetails}>
                        <p><b>Name</b></p>
                        <p>At Address,</p>
                        <p>area, city</p>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon=""
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon=""
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Disabled Accordion</Typography>
                </AccordionSummary>
            </Accordion>
        </div>
    )
}

export {AccordianComp}