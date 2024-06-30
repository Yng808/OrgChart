function initChart() {
    let chart;

    // This is the data used - https://github.com/bumbeishvili/sample-data/blob/main/data-oracle.csv
    d3.csv(
        'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/data-oracle.csv'
    ).then((data) => {
        chart = new d3.OrgChart()
            .nodeHeight((d) => 85 + 25)
            .nodeWidth((d) => 220 + 2)
            .childrenMargin((d) => 50)
            .compactMarginBetween((d) => 35)
            .compactMarginPair((d) => 30)
            .neighbourMargin((a, b) => 20)
            .nodeContent(function (d, i, arr, state) {
                const color = '#FFFFFF';
                const imageDiffVert = 25 + 2;
                return `
                <div style='width:${d.width}px; height:${d.height}px; padding-top:${imageDiffVert - 2}px; padding-left:1px ;padding-right:1px'>
                    <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9">
                        <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${d.data.id}</div>
                        <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                        <div style="margin-top:${-imageDiffVert - 20}px;">   
                            <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />
                        </div>
                        <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px"> ${d.data.name} </div>
                        <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.position} </div>
                        <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> Leader: ${d.data.officeLeader} </div>

                    </div>
                </div>`;
            })
            
            .container('.chart-container')
            .data(data)
            .render();
    });
}

function initChartWithJson(jsonData) {
    let chart;
    const data = JSON.parse(jsonData).map(d => ({
        id: d.Id,
        parentId: d.ParentId,
        name: `${d.Name} ${d.LastName}`, // Combining Name and LastName
        position: d.Position,
        image: d.Image,
        officeLeader: d.OfficeLeader 
    }));

    chart = new d3.OrgChart()
        .nodeHeight((d) => 85 + 25)
        .nodeWidth((d) => 220 + 2)
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 35)
        .compactMarginPair((d) => 30)
        .neighbourMargin((a, b) => 20)
        .nodeContent(function (d, i, arr, state) {
            const color = '#FFFFF1';
            const imageDiffVert = 25 + 2;
            const leaderContent = d.data.officeLeader ? `<div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;">Leader: ${d.data.officeLeader}</div>` : '';
            return `
                <div style='width:${d.width}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px;'>
                    <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9;">
                        <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">${d.data.id}</div>
                        <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                        <div style="margin-top:${-imageDiffVert - 20}px;">   
                            <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />
                        </div>
                        <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${d.data.name} </div>
                        <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.position} </div>
                        ${leaderContent}
                    </div>
                </div>`;
        })
        
        // configuration remains the same...
        .container('.chart-container')
        .data(data) // Use the parsed data here
        .render();

    chart.compact(false).render().fit();



    chart.expandAll().fit()
}